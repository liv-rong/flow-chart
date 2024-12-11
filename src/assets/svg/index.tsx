import type { SVGProps } from 'react'

const RotateSvg = (props: SVGProps<SVGSVGElement>) => {
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

const FlipSvg = (props: SVGProps<SVGSVGElement>) => {
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
function AlignHorizontalCenter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.5 20.5v-4.192H8.02q-.414 0-.717-.303T7 15.289t.303-.717t.716-.303H11.5V9.731H5.02q-.414 0-.717-.303T4 8.711t.303-.716t.716-.303H11.5V3.5q0-.213.144-.356T12.001 3t.356.144t.143.356v4.192h6.48q.414 0 .717.303t.303.716t-.303.717t-.716.303H12.5v4.538h3.48q.414 0 .717.303t.303.716t-.303.717t-.716.303H12.5V20.5q0 .213-.144.356t-.357.144t-.356-.144t-.143-.356"
      ></path>
    </svg>
  )
}

function AlignHorizontalLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.27 21q-.214 0-.357-.143t-.144-.357v-17q0-.213.144-.357T4.269 3t.357.143t.143.357v17q0 .214-.143.357T4.269 21m4.097-4.692q-.414 0-.717-.303t-.303-.717t.303-.716t.717-.303h4.846q.413 0 .716.303t.303.716t-.303.717q-.303.303-.716.303zm0-6.577q-.414 0-.717-.303t-.303-.717t.303-.716t.717-.303h10.846q.413 0 .716.303t.303.716t-.303.717t-.716.303z"
      ></path>
    </svg>
  )
}

function AlignHorizontalRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19.73 21q-.213 0-.356-.143t-.143-.357v-17q0-.213.143-.357T19.731 3t.356.143t.144.357v17q0 .214-.144.357t-.356.143m-8.942-4.692q-.414 0-.717-.303t-.303-.717t.303-.716t.717-.303h4.846q.413 0 .716.303t.303.716t-.303.717q-.303.303-.716.303zm-6-6.577q-.414 0-.717-.303t-.303-.717t.303-.716t.717-.303h10.846q.413 0 .716.303t.303.716t-.303.717t-.716.303z"
      ></path>
    </svg>
  )
}

function AlignVerticalBottom(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.5 20.5q-.213 0-.357-.143T3 20t.143-.357t.357-.143h17q.214 0 .357.143T21 20t-.143.357t-.357.143zm5.212-3.577q-.414 0-.717-.303t-.303-.716V4.5q0-.413.303-.716t.717-.303t.716.303t.303.716v11.404q0 .413-.303.716t-.716.303m6.577 0q-.414 0-.717-.303t-.303-.716V10.5q0-.413.303-.716t.717-.303t.716.303t.303.716v5.404q0 .413-.303.716t-.717.303"
      ></path>
    </svg>
  )
}

function AlignVerticalCenter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.616 20q-.414 0-.717-.303t-.303-.716V12.5H3.5q-.213 0-.356-.144T3 11.999t.144-.356t.356-.143h4.096V5.02q0-.414.303-.717T8.616 4t.716.303t.303.716V11.5h4.73V8.02q0-.414.303-.717T15.385 7t.716.303t.303.716V11.5H20.5q.213 0 .356.144t.144.357t-.144.356t-.356.143h-4.096v3.48q0 .414-.303.717t-.716.303t-.717-.303t-.302-.716V12.5H9.635v6.48q0 .414-.303.717T8.616 20"
      ></path>
    </svg>
  )
}
function AlignVerticalTop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.712 20.5q-.414 0-.717-.303t-.303-.716V8.077q0-.413.303-.716t.717-.303t.716.303q.303.303.303.716v11.404q0 .413-.303.716t-.717.303m6.577-6q-.413 0-.716-.303t-.303-.716V8.077q0-.413.303-.716t.717-.303t.716.303q.303.303.303.716v5.404q0 .413-.303.716t-.716.303M3.5 4.48q-.213 0-.357-.142T3 3.98t.143-.357t.357-.143h17q.214 0 .357.143T21 3.98t-.143.357t-.357.143z"
      ></path>
    </svg>
  )
}

export {
  RotateSvg,
  FlipSvg,
  AlignHorizontalCenter,
  AlignHorizontalLeft,
  AlignHorizontalRight,
  AlignVerticalBottom,
  AlignVerticalCenter,
  AlignVerticalTop
}
