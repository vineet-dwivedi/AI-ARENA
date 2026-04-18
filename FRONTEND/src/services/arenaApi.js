const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
).replace(/\/$/, '')

/**
 * Sends the current prompt to the backend LangGraph endpoint and returns the
 * raw graph payload so the UI can map it into the local view model.
 */
export async function requestArenaBattle(prompt, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}/use-graph`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: options.signal,
    })
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error
    }

    throw new Error(
      `Could not reach the backend at ${API_BASE_URL}. Make sure the BACKEND server is running and VITE_API_URL is correct.`,
    )
  }

  let payload

  try {
    payload = await response.json()
  } catch {
    throw new Error('The backend returned an unreadable response.')
  }

  if (!response.ok || !payload?.success) {
    if (response.status >= 500 && !payload?.error) {
      throw new Error(
        'The backend failed while processing the request. Check the BACKEND terminal logs for the real error.',
      )
    }

    throw new Error(
      payload?.error ||
        'The backend failed while processing the request. Check the BACKEND terminal logs for details.',
    )
  }

  return payload.data
}

export { API_BASE_URL }
