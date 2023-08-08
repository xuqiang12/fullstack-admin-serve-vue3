export interface TableColumnBtn {
  btnlable: String;
  flag: String;
  btnType?: "icon" | "svgIcon" | "routine";
}
export interface TableColumn {
  pram: String | Array<TableColumnBtn>;
  label: String;
}
