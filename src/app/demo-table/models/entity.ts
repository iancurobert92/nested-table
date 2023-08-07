export interface Entity {
  name: string;
  type: 'person' | 'company';
  email: string;
  phoneNo: string;
  companyName: string;
  address: string;
  children?: Entity[];
}
