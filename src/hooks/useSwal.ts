import swal from "sweetalert";

export const useSwal = () => {
  const onAction = (title = ""): Promise<boolean> =>
    swal({
      title,
      text: "Aksi ini tidak bisa dibatalkan",
      icon: "warning",
      buttons: ["Batal", "Hapus"],
    });

  return {
    onAction,
    swal,
  };
};
