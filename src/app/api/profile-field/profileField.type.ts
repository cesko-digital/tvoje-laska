export type ProfileFieldResponse = {
    id:                number;
    group_id:          number;
    parent_id:         number;
    type:              Type;
    name:              string;
    description:       Description;
    is_required:       boolean;
    can_delete:        boolean;
    field_order:       number;
    option_order:      number;
    order_by:          OrderBy;
    is_default_option: boolean;
    data?:             Data;
    options?:          FieldOption[];
    _links?:           Links;
}

export type Links = {
    self:       Collection[];
    collection: Collection[];
    group:      Group[];
}

export type Collection = {
    href: string;
}

export type Group = {
    embeddable: boolean;
    href:       string;
}

export type Data = {
    id:    number;
    value: Value;
}

export type GetProfileFieldsParams = {
    userId: number
}

export type FieldOption = {
    id:                number;
    group_id:          number;
    parent_id:         number;
    type:              string;
    name:              string;
    description:       FieldOptionDescription;
    is_required:       boolean;
    can_delete:        boolean;
    field_order:       number;
    option_order:      number;
    order_by:          string;
    is_default_option: boolean;
}

export type FieldOptionDescription = {
    rendered: string;
}


export type Value = {
    raw:          string;
    unserialized: string[];
    rendered:     string;
}

export type Description = {
    rendered: Rendered;
}

export type Rendered = "" | "Základní představení uživatele" | "cm";

export type OrderBy = "" | "CUSTOM" | "ASC";

export type Type = "textbox" | "selectbox" | "datebox" | "textarea" | "number" | "checkbox" | "option";