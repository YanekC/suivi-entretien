import { NavLink } from "react-router";

export default function ReturnButton({ url }: { url: string }) {
  return (
    <NavLink
      to={url}
      className="absolute left-0 top-0 p-2 text-blue-500 hover:text-blue-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current"
      >
        <path
          d="M15 18l-6-6 6-6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </NavLink>
  );
}
