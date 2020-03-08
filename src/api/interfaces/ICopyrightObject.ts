export interface ICopyrightObject {
  text: string;
  type: CopyrightType;
}

enum CopyrightType {
  Copyright = "C",
  Performance = "P",
}
