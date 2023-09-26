import SFormDialog from "../FormDialog/SFormDialog";
import STextField from "../TextField/STextField";

export default function CreateTransaction() {
  return (
    <SFormDialog actionName="Tạo Giao Dịch" title="Tạo Giao Dịch">
      <STextField label="Tên giao dịch" fullWidth />
    </SFormDialog>
  );
}
