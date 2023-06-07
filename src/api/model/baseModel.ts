export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface OptionItem {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

