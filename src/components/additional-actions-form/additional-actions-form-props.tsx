interface additionalAction {
  text: string;
  link: string;
  linkText: string;
}

export interface IAdditionalActionsForm {
  additionalActions: Array<additionalAction>;
}
