import type { SVGProps } from 'react'

const rotateSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 4L.5 13.5h13"></path>
        <path d="M7.5 13.5a7 7 0 0 0-2.05-4.95"></path>
      </g>
    </svg>
  )
}

const flipSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11 13.5l-4-4l-4 4zm0-13l-4 4l-4-4zM13.5 7h-1m-2 0h-1m-2 0h-1m-2 0h-1m-2 0h-1"
      ></path>
    </svg>
  )
}

export { rotateSvg, flipSvg }
