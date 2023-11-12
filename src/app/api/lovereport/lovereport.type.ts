
export type LoveReportResult = {
    ID: string,
    post_author: string,
    post_content: string,
    post_title: string,
    post_status: string,
}

export type PostContent = {
   id: string,
   field_id: string,
   fields:  { [key: string]: LoveReportField}
}

export type LoveReportFieldType = 'name' | 'pagebreak' | 'html' | 'date-time' | 'radio' | 'checkbox' | 'hidden' | 'email' | 'number' | 'text';

export type LoveReportField = {
    id: string,
    type: LoveReportFieldType,
    label: string,
    value: string;
    description: string,
    required: string,
    size: string,
    placeholder: string,
    title?: string;
    default_value: string,
    css: string,
    date_placeholder?: string,
    date_format?: string,
    date_type?: string,
    time_placeholder?: string,
    time_format?: string,
    time_interval?: string,
    choices?: { [key: string]: Choice},
    conditional?: Conditionals[],
    conditional_logic?: string,
    conditional_type?: string,
}

type Choice = {
  default: string,
  label: string,
  value: string,
  image: string
}

type Conditionals = Conditional[]

type Conditional = {
   field: string,
   operator: string,
   value: string
}

export type SaveLoveReportRequest = {
  form_id: number
  post_id: number
  user_id: number
  viewed: number
  starred: number
  fields: Array<ValueField>
  fields_json: string
  meta: string
  date: string
  date_modified: string
  ip_address: string
  user_agent: string
  user_uuid: string
}

export type SaveLoveReportData = {
  entryId: number;
};

export type ValueField = {
  value: string,
  form_id: number,
  field_id: number,
  date?: string | undefined
};