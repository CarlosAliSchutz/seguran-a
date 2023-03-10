import "./index.css";

export function Button({ children, ...props }) {
  return (
    <button {...props}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </button>
  );
}
