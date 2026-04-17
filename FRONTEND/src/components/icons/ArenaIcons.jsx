function iconProps(props) {
  return {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    ...props,
  }
}

export function ArenaMark() {
  return (
    <span className="arena-mark" aria-hidden="true">
      AI
    </span>
  )
}

export function SunIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.8V5.2M12 18.8V21.2M21.2 12H18.8M5.2 12H2.8M18.45 5.55L16.75 7.25M7.25 16.75L5.55 18.45M18.45 18.45L16.75 16.75M7.25 7.25L5.55 5.55"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MoonIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path
        d="M15.4 3.5A8.8 8.8 0 1 0 20.5 15a7.1 7.1 0 0 1-5.1-11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BattleIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path
        d="m8 8 8 8M16 8l-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.5 5.5v2M13.5 16.5v2M16.5 5.5v2M5.5 13.5h2M16.5 13.5h2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ClockIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="7.3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8.4v4.3l2.8 1.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ScalesIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path
        d="M12 5v14M8 5h8M5 9h14M7 9l-2.5 4.7a2.6 2.6 0 0 0 4.9 0L7 9Zm10 0-2.5 4.7a2.6 2.6 0 0 0 4.9 0L17 9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function RefreshIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path
        d="M18.2 8.8A6.9 6.9 0 0 0 6.6 6.9L5 8.5M5 8.5V5.4M5 8.5h3.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.8 15.2A6.9 6.9 0 0 0 17.4 17.1l1.6-1.6M19 15.5v3.1M19 18.6h-3.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronIcon({ isOpen, ...props }) {
  return (
    <svg {...iconProps(props)}>
      <path
        d={isOpen ? 'M7 14.5 12 9.5l5 5' : 'M7 9.5 12 14.5l5-5'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
