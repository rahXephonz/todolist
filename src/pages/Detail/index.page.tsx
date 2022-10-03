import { useRouter } from "hooks/useRouter";
import { useEffect } from "react";
import { useSwal } from "hooks/useSwal";

export const Detail = () => {
  const { query, push } = useRouter();
  const { onAction, swal } = useSwal();
  const { id } = query;

  useEffect(() => {
    if (!id) push("/");
  }, [id, push]);

  const onClick = () => {
    onAction("Apakah anda yakin ingin menghapus item ini?").then(
      (answer: boolean) => {
        if (answer) {
          swal({
            text: "✔️ Berhasil, item berhasil dihapus!",
            icon: "success",
          });
        }
      },
    );
  };

  return (
    <div>
      Query Data Detail {id}
      <button onClick={onClick}>Click Me</button>
    </div>
  );
};
