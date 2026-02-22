export interface OptionItem {
  value: string;
  label: string;
}

export interface historiesCalendarEvent {
  id: string;
  title: string;
  type?: string;
  resourceId?: string;
  startEditable?: boolean;
  durationEditable?: boolean;
  date?: Date;
  className?: string;
  start?: any;
  color?: string;
  end?: any;
  allDay?: boolean;
  extendedProps?: any;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}
