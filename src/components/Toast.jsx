import { useStateContext } from "../contexts/ContextProvider";

export default function Toast() {
  const { toast } = useStateContext();

  return (
    <>
      {toast.show && (
        <div
          className="toast_message"
          style={{ background: `${toast.color === "green" ? "green" : "red"}` }}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
