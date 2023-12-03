type Props = {
  width: string | number;
  height?: string | number;
  strokeWidth?: string | number;
};

export const CheckMarkSvg = ({ width, height, strokeWidth }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.3438 0.480469C23.8516 0.988281 23.8516 1.75 23.3438 2.20703L9.9375 15.6133C9.48047 16.1211 8.71875 16.1211 8.26172 15.6133L1.35547 8.70703C0.847656 8.25 0.847656 7.48828 1.35547 6.98047C1.8125 6.52344 2.57422 6.52344 3.03125 6.98047L9.125 13.0742L21.668 0.480469C22.125 0.0234375 22.8867 0.0234375 23.3438 0.480469Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const DoubleCheckMarkSvg = ({ width, height, strokeWidth }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.76562 1.53906L5.01562 5.28906C4.73438 5.59375 4.24219 5.59375 3.96094 5.28906L2.08594 3.41406C1.78125 3.13281 1.78125 2.64062 2.08594 2.35938C2.36719 2.05469 2.85938 2.05469 3.14062 2.35938L4.5 3.69531L7.71094 0.484375C7.99219 0.179688 8.48438 0.179688 8.76562 0.484375C9.07031 0.765625 9.07031 1.25781 8.76562 1.53906ZM11.0156 4.53906L5.01562 10.5391C4.73438 10.8438 4.24219 10.8438 3.96094 10.5391L0.960938 7.53906C0.65625 7.25781 0.65625 6.76562 0.960938 6.48438C1.24219 6.17969 1.73438 6.17969 2.01562 6.48438L4.5 8.94531L9.96094 3.48438C10.2422 3.17969 10.7344 3.17969 11.0156 3.48438C11.3203 3.76562 11.3203 4.25781 11.0156 4.53906Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const BadgeSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0C13.6875 0 15.1875 0.984375 15.9375 2.4375C17.4844 1.92188 19.2656 2.29688 20.4844 3.51562C21.7031 4.73438 22.0781 6.51562 21.5625 8.0625C23.0156 8.8125 24 10.3125 24 12C24 13.7344 23.0156 15.2344 21.5625 15.9844C22.0781 17.5312 21.7031 19.2656 20.4844 20.4844C19.2656 21.7031 17.4844 22.0781 15.9375 21.6094C15.1875 23.0625 13.6875 24 12 24C10.2656 24 8.76562 23.0625 8.01562 21.6094C6.46875 22.0781 4.73438 21.7031 3.51562 20.4844C2.29688 19.2656 1.92188 17.5312 2.39062 15.9844C0.9375 15.2344 0 13.7344 0 12C0 10.3125 0.9375 8.8125 2.39062 8.0625C1.92188 6.51562 2.29688 4.73438 3.51562 3.51562C4.73438 2.29688 6.46875 1.92188 8.01562 2.4375C8.76562 0.984375 10.2656 0 12 0ZM16.5469 10.5469C16.9688 10.125 16.9688 9.42188 16.5469 9C16.0781 8.53125 15.375 8.53125 14.9531 9L10.5 13.4531L8.67188 11.625C8.20312 11.1562 7.5 11.1562 7.07812 11.625C6.60938 12.0469 6.60938 12.75 7.07812 13.1719L9.70312 15.7969C10.125 16.2656 10.8281 16.2656 11.2969 15.7969L16.5469 10.5469Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 9.5C7 6.76562 9.22656 4.5 12 4.5C14.7344 4.5 17 6.76562 17 9.5C17 12.2734 14.7344 14.5 12 14.5C9.22656 14.5 7 12.2734 7 9.5ZM12 12.625C13.7188 12.625 15.125 11.2578 15.125 9.5C15.125 7.78125 13.7188 6.375 12 6.375C11.9609 6.375 11.9219 6.375 11.8828 6.375C11.9609 6.60937 12 6.80469 12 7C12 8.40625 10.8672 9.5 9.5 9.5C9.26563 9.5 9.07031 9.5 8.875 9.42187C8.875 9.46094 8.875 9.5 8.875 9.5C8.875 11.2578 10.2422 12.625 12 12.625ZM4.46094 3.91406C6.29688 2.19531 8.83594 0.75 12 0.75C15.125 0.75 17.6641 2.19531 19.5 3.91406C21.3359 5.59375 22.5469 7.625 23.1328 9.03125C23.25 9.34375 23.25 9.69531 23.1328 10.0078C22.5469 11.375 21.3359 13.4062 19.5 15.125C17.6641 16.8437 15.125 18.25 12 18.25C8.83594 18.25 6.29688 16.8438 4.46094 15.125C2.625 13.4062 1.41406 11.375 0.828125 10.0078C0.710938 9.69531 0.710938 9.34375 0.828125 9.03125C1.41406 7.625 2.625 5.59375 4.46094 3.91406ZM12 2.625C9.42188 2.625 7.35156 3.79687 5.75 5.28125C4.22656 6.6875 3.21094 8.32812 2.66406 9.5C3.21094 10.6719 4.22656 12.3516 5.75 13.7578C7.35156 15.2422 9.42188 16.375 12 16.375C14.5391 16.375 16.6094 15.2422 18.2109 13.7578C19.7344 12.3516 20.75 10.6719 21.2969 9.5C20.75 8.32812 19.7344 6.6875 18.2109 5.28125C16.6094 3.79687 14.5391 2.625 12 2.625Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const BellSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2.125V2.89844C15.0938 3.41406 17.5 6.12109 17.5 9.34375V10.8047C17.5 12.7383 18.1445 14.6289 19.3477 16.1758L19.9922 16.9492C20.25 17.293 20.293 17.7227 20.1211 18.0664C19.9492 18.4102 19.6055 18.625 19.2188 18.625H2.03125C1.60156 18.625 1.25781 18.4102 1.08594 18.0664C0.914062 17.7227 0.957031 17.293 1.21484 16.9492L1.85938 16.1758C3.0625 14.6289 3.75 12.7383 3.75 10.8047V9.34375C3.75 6.12109 6.11328 3.41406 9.25 2.89844V2.125C9.25 1.39453 9.85156 0.75 10.625 0.75C11.3555 0.75 12 1.39453 12 2.125ZM10.2812 4.875C7.78906 4.875 5.8125 6.89453 5.8125 9.34375V10.8047C5.8125 12.8672 5.21094 14.8438 4.09375 16.5625H17.1133C15.9961 14.8438 15.4375 12.8672 15.4375 10.8047V9.34375C15.4375 6.89453 13.418 4.875 10.9688 4.875H10.2812ZM13.375 20C13.375 20.7305 13.0742 21.4609 12.5586 21.9766C12.043 22.4922 11.3125 22.75 10.625 22.75C9.89453 22.75 9.16406 22.4922 8.64844 21.9766C8.13281 21.4609 7.875 20.7305 7.875 20H13.375Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ShoppingBagSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.23901 7.5V5.25C6.23901 2.39062 8.58276 0 11.489 0C14.3484 0 16.739 2.39062 16.739 5.25V7.5H19.739C20.9578 7.5 21.989 8.53125 21.989 9.75V19.5C21.989 21.9844 19.9734 24 17.489 24H5.48901C2.95776 24 0.989014 21.9844 0.989014 19.5V9.75C0.989014 8.53125 1.97339 7.5 3.23901 7.5H6.23901ZM8.48901 7.5H14.489V5.25C14.489 3.60938 13.1296 2.25 11.489 2.25C9.80151 2.25 8.48901 3.60938 8.48901 5.25V7.5ZM3.23901 9.75V19.5C3.23901 20.7656 4.22339 21.75 5.48901 21.75H17.489C18.7078 21.75 19.739 20.7656 19.739 19.5V9.75H16.739V12.375C16.739 13.0312 16.2234 13.5 15.614 13.5C14.9578 13.5 14.489 13.0312 14.489 12.375V9.75H8.48901V12.375C8.48901 13.0312 7.97339 13.5 7.36401 13.5C6.70776 13.5 6.23901 13.0312 6.23901 12.375V9.75H3.23901Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ShakingHandsSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.1172 0.859375C13.7812 0.3125 14.6016 0 15.4609 0C16.1641 0 16.8672 0.234375 17.4531 0.585938L20.3047 2.42188L20.4609 2.5H20.5H20.6562H23.625C24.6406 2.5 25.5 3.35938 25.5 4.375V9.375C25.5 10.4297 24.6406 11.25 23.625 11.25H21.9844L15.0703 4.88281L15.8516 4.25781C16.125 4.0625 16.2031 3.67188 15.9688 3.39844C15.7734 3.125 15.3828 3.04688 15.1094 3.28125L11.2031 6.28906C10.5391 6.79688 9.5625 6.67969 9.05469 5.97656C8.58594 5.3125 8.70312 4.41406 9.32812 3.90625L13.1172 0.859375ZM14.0156 5.70312L19.25 10.5078C19.9922 11.2109 20.0703 12.3828 19.3672 13.1641C18.7422 13.8672 17.6875 13.9453 16.9453 13.4375C16.8672 13.6719 16.7109 13.9062 16.5547 14.1016C15.8516 14.8438 14.6797 14.9219 13.8984 14.2188L13.2344 13.5938C13.1562 13.9062 13 14.1797 12.8047 14.4141C12.1016 15.1562 10.9297 15.2344 10.1484 14.5312L6.59375 11.25H2.375C1.32031 11.25 0.5 10.4297 0.5 9.375V4.375C0.5 3.35938 1.32031 2.5 2.375 2.5H5.5L8.3125 0.625C8.89844 0.234375 9.64062 0 10.3438 0.0390625C10.8516 0.0390625 11.3594 0.117188 11.7891 0.3125L8.54688 2.92969C7.41406 3.86719 7.17969 5.54688 8.03906 6.71875C8.97656 7.96875 10.7734 8.24219 11.9844 7.26562L14.0156 5.70312Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ImagePlaceholderSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 120 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 15.5C0 7.29688 6.5625 0.5 15 0.5H105C113.203 0.5 120 7.29688 120 15.5V90.5C120 98.9375 113.203 105.5 105 105.5H15C6.5625 105.5 0 98.9375 0 90.5V15.5ZM75.7031 40.5781C74.7656 38.9375 72.8906 38 71.25 38C69.375 38 67.5 38.9375 66.5625 40.5781L46.1719 70.5781L39.8438 62.6094C38.9062 61.4375 37.2656 60.5 35.625 60.5C33.75 60.5 32.1094 61.4375 31.1719 62.6094L16.1719 81.3594C14.7656 83.2344 14.5312 85.5781 15.4688 87.4531C16.4062 89.3281 18.2812 90.5 20.625 90.5H43.125H50.625H99.375C101.25 90.5 103.359 89.5625 104.297 87.6875C105.234 85.8125 105 83.4688 103.828 81.8281L75.7031 40.5781ZM26.25 38C32.3438 38 37.5 33.0781 37.5 26.75C37.5 20.6562 32.3438 15.5 26.25 15.5C19.9219 15.5 15 20.6562 15 26.75C15 33.0781 19.9219 38 26.25 38Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TimerSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 7.25C14 11.1328 10.8555 14.25 7 14.25C3.11719 14.25 0 11.1328 0 7.25C0 5.80078 0.4375 4.46094 1.20312 3.33984C1.39453 3.03906 1.80469 2.95703 2.10547 3.14844C2.40625 3.36719 2.48828 3.77734 2.26953 4.07812C1.66797 4.98047 1.28516 6.07422 1.28516 7.25C1.28516 10.3945 3.85547 12.9375 6.97266 12.9375C10.1172 12.9375 12.6875 10.3945 12.6875 7.25C12.6875 4.35156 10.4727 1.94531 7.65625 1.61719V3.09375C7.65625 3.47656 7.35547 3.75 6.97266 3.75C6.61719 3.75 6.31641 3.47656 6.31641 3.09375V0.90625C6.31641 0.550781 6.61719 0.25 6.97266 0.25C10.8555 0.25 14 3.39453 14 7.25ZM7.4375 6.78516C7.71094 7.05859 7.71094 7.46875 7.4375 7.71484C7.19141 7.98828 6.78125 7.98828 6.53516 7.71484L4.34766 5.52734C4.07422 5.28125 4.07422 4.87109 4.34766 4.59766C4.59375 4.35156 5.00391 4.35156 5.25 4.59766L7.4375 6.78516Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const UserSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.875 12.375C14.6641 12.375 17.75 15.4609 17.75 19.25C17.75 19.9531 17.1641 20.5 16.5 20.5L1.5 20.5C0.796875 20.5 0.25 19.9531 0.25 19.25C0.25 15.4609 3.29688 12.375 7.125 12.375H10.875ZM2.125 18.625L15.8359 18.625C15.5234 16.1641 13.4141 14.25 10.875 14.25H7.125C4.54688 14.25 2.4375 16.1641 2.125 18.625ZM9 10.5C6.22656 10.5 4 8.27344 4 5.5C4 2.76562 6.22656 0.5 9 0.5C11.7344 0.5 14 2.76562 14 5.5C14 8.27344 11.7344 10.5 9 10.5ZM9 2.375C7.24219 2.375 5.875 3.78125 5.875 5.5C5.875 7.25781 7.24219 8.625 9 8.625C10.7188 8.625 12.125 7.25781 12.125 5.5C12.125 3.78125 10.7188 2.375 9 2.375Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const HeartSolidSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.20312 13.1094C0.796875 11.7969 0 9.92188 0 7.95312V7.71875C0 4.4375 2.34375 1.625 5.57812 1.10938C7.73438 0.734375 9.89062 1.4375 11.4375 2.9375L12 3.5L12.5625 2.9375C14.0625 1.4375 16.2656 0.734375 18.375 1.10938C21.6094 1.625 24 4.4375 24 7.71875V7.95312C24 9.92188 23.1562 11.7969 21.75 13.1094L13.2656 21.0312C12.9375 21.3594 12.4688 21.5 12 21.5C11.4844 21.5 11.0156 21.3594 10.6875 21.0312L2.20312 13.1094Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const HuggingEmojiSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.9531 16.918C17.2656 16.918 18.25 16.4961 19 15.9805V18.5586C18.1094 18.9336 17.125 19.168 15.9531 19.168C14.8281 19.168 13.8438 18.9336 12.9531 18.5586V15.9805C13.7031 16.4961 14.6875 16.918 15.9531 16.918ZM4 11.8086C4.32812 5.48047 9.57812 0.417969 15.9531 0.417969C22.375 0.417969 27.625 5.48047 27.9531 11.8086C27.2031 11.5742 26.3594 11.7148 25.7031 12.2773C25.6094 6.98047 21.2969 2.66797 15.9531 2.66797C10.6562 2.66797 6.34375 6.98047 6.25 12.2773C5.59375 11.7148 4.75 11.5742 4 11.8086ZM15.9531 22.168C17.125 22.168 18.2031 21.9805 19.2344 21.6523C19.4219 22.4023 19.7969 23.0586 20.2656 23.668C18.9062 24.1836 17.5 24.418 16 24.418C14.4531 24.418 13.0469 24.1836 11.6875 23.668C12.1562 23.0586 12.5312 22.4023 12.7188 21.6523C13.75 21.9805 14.8281 22.168 16 22.168H15.9531ZM14.1719 11.1523C14.1719 11.1523 14.1719 11.1055 14.125 11.1055C14.125 11.0586 14.0781 11.0117 13.9844 10.9648C13.8906 10.8242 13.7031 10.6367 13.5156 10.4492C13.0938 10.1211 12.625 9.79297 12.2031 9.79297C11.8281 9.79297 11.3594 10.1211 10.9375 10.4492C10.75 10.6367 10.5625 10.8242 10.4688 10.9648C10.375 11.0117 10.3281 11.0586 10.3281 11.1055C10.2812 11.1055 10.2812 11.1523 10.2812 11.1523C10.1875 11.293 10 11.3398 9.85938 11.293C9.71875 11.2461 9.57812 11.1055 9.57812 10.918C9.57812 10.1211 9.90625 9.27734 10.375 8.66797C10.8438 8.05859 11.5 7.54297 12.2031 7.54297C12.9531 7.54297 13.6094 8.05859 14.0781 8.66797C14.5469 9.27734 14.8281 10.1211 14.8281 10.918C14.8281 11.1055 14.7344 11.2461 14.5938 11.293C14.4531 11.3398 14.2656 11.293 14.1719 11.1523ZM21.6719 11.1523C21.6719 11.1523 21.6719 11.1055 21.625 11.1055C21.625 11.0586 21.5781 11.0117 21.4844 10.9648C21.3906 10.8242 21.2031 10.6367 21.0156 10.4492C20.5938 10.1211 20.125 9.79297 19.75 9.79297C19.3281 9.79297 18.8594 10.1211 18.4375 10.4492C18.25 10.6367 18.0625 10.8242 17.9688 10.9648C17.875 11.0117 17.8281 11.0586 17.8281 11.1055C17.7812 11.1055 17.7812 11.1523 17.7812 11.1523C17.6875 11.293 17.5 11.3398 17.3594 11.293C17.2188 11.2461 17.125 11.1055 17.125 10.918C17.125 10.1211 17.4062 9.27734 17.875 8.66797C18.3438 8.05859 19 7.54297 19.75 7.54297C20.4531 7.54297 21.1094 8.05859 21.5781 8.66797C22.0469 9.27734 22.375 10.1211 22.375 10.918C22.375 11.1055 22.2344 11.2461 22.0938 11.293C21.9531 11.3398 21.7656 11.293 21.6719 11.1523ZM25.375 16.8711C25.2344 17.0117 25.2344 17.1992 25.375 17.293C25.4688 17.4336 25.6562 17.4336 25.7969 17.293L28.9375 14.1523C29.2188 13.8711 29.7344 13.8711 30.0156 14.1523C30.2969 14.4336 30.2969 14.9492 30.0156 15.2305L26.875 18.3711C26.7344 18.5117 26.7344 18.6992 26.875 18.793C26.9688 18.9336 27.1562 18.9336 27.2969 18.793L29.6875 16.4023C29.9688 16.1211 30.4844 16.1211 30.7656 16.4023C31.0469 16.6836 31.0469 17.1992 30.7656 17.4805L28.375 19.8711C28.2344 20.0117 28.2344 20.1992 28.375 20.293C28.4688 20.4336 28.6562 20.4336 28.7969 20.293L29.6875 19.4023C29.9688 19.1211 30.4844 19.1211 30.7656 19.4023C31.0469 19.6836 31.0469 20.1992 30.7656 20.4805L28.0938 23.1523C27.25 23.9492 26.125 24.418 24.9531 24.418C22.4688 24.418 20.5 22.4492 20.5 19.9648V15.9336C20.5 15.418 20.875 14.9961 21.4375 14.9961C21.9531 14.9961 22.375 15.418 22.375 15.9336V16.8711C22.375 17.1992 22.75 17.3398 22.9844 17.1055L26.6875 13.4023C26.9688 13.1211 27.4844 13.1211 27.7656 13.4023C28.0469 13.6836 28.0469 14.1992 27.7656 14.4805L25.375 16.8711ZM5.26562 13.4023L8.96875 17.1055C9.20312 17.3398 9.625 17.1992 9.625 16.8711V15.9336C9.625 15.418 10 14.9961 10.5625 14.9961C11.0781 14.9961 11.5 15.418 11.5 15.9336V19.9648C11.5 22.4492 9.48438 24.418 7 24.418C5.82812 24.418 4.70312 23.9492 3.85938 23.1523L1.1875 20.4805C0.90625 20.1992 0.90625 19.6836 1.1875 19.4023C1.46875 19.1211 1.98438 19.1211 2.26562 19.4023L3.15625 20.293C3.29688 20.4336 3.48438 20.4336 3.57812 20.293C3.71875 20.1992 3.71875 20.0117 3.57812 19.8711L1.1875 17.4805C0.90625 17.1992 0.90625 16.6836 1.1875 16.4023C1.46875 16.1211 1.98438 16.1211 2.26562 16.4023L4.65625 18.793C4.79688 18.9336 4.98438 18.9336 5.07812 18.793C5.21875 18.6992 5.21875 18.5117 5.07812 18.3711L1.9375 15.2305C1.65625 14.9492 1.65625 14.4336 1.9375 14.1523C2.21875 13.8711 2.73438 13.8711 3.01562 14.1523L6.15625 17.293C6.29688 17.4336 6.48438 17.4336 6.57812 17.293C6.71875 17.1992 6.71875 17.0117 6.57812 16.8711L4.1875 14.4805C3.90625 14.1992 3.90625 13.6836 4.1875 13.4023C4.46875 13.1211 4.98438 13.1211 5.26562 13.4023Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CommunitySvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.625 6.25C3.86719 6.25 2.5 4.88281 2.5 3.125C2.5 1.40625 3.86719 0 5.625 0C7.34375 0 8.75 1.40625 8.75 3.125C8.75 4.88281 7.34375 6.25 5.625 6.25ZM20 6.25C18.2422 6.25 16.875 4.88281 16.875 3.125C16.875 1.40625 18.2422 0 20 0C21.7188 0 23.125 1.40625 23.125 3.125C23.125 4.88281 21.7188 6.25 20 6.25ZM0 11.6797C0 9.375 1.83594 7.5 4.14062 7.5H5.82031C6.44531 7.5 7.03125 7.65625 7.57812 7.89062C7.5 8.16406 7.5 8.47656 7.5 8.75C7.5 10.2734 8.125 11.6016 9.17969 12.5C9.17969 12.5 9.17969 12.5 9.14062 12.5H0.820312C0.351562 12.5 0 12.1484 0 11.6797ZM15.8203 12.5H15.7812C16.8359 11.6016 17.4609 10.2734 17.4609 8.75C17.4609 8.47656 17.4609 8.16406 17.4219 7.89062C17.9297 7.65625 18.5156 7.5 19.1406 7.5H20.8203C23.125 7.5 25 9.375 25 11.6797C25 12.1484 24.6094 12.5 24.1406 12.5H15.8203ZM16.25 8.75C16.25 10.8203 14.5703 12.5 12.5 12.5C10.4297 12.5 8.75 10.8203 8.75 8.75C8.75 6.67969 10.4297 5 12.5 5C14.5703 5 16.25 6.67969 16.25 8.75ZM5 18.9844C5 16.0938 7.30469 13.75 10.1953 13.75H14.7656C17.6562 13.75 20 16.0938 20 18.9844C20 19.5312 19.5312 20 18.9453 20H6.01562C5.46875 20 5 19.5703 5 18.9844Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const HandSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.9531 11.875C12.8125 11.875 13.4375 12.6172 13.3984 13.3984C13.3984 13.8281 13.2812 14.2188 12.9688 14.5312L10.8594 16.7578C10.7812 16.8359 10.7031 16.875 10.5859 16.875C10.5078 16.875 10.4297 16.8359 10.3516 16.7578L8.24219 14.5312C7.92969 14.2188 7.77344 13.8281 7.77344 13.3984C7.77344 12.5781 8.39844 11.875 9.25781 11.875C9.6875 11.875 10.0781 12.0312 10.3906 12.3438L10.5859 12.5781L10.8203 12.3438C11.1328 12.0312 11.5234 11.875 11.9531 11.875ZM15.9375 3.125C17.4609 3.125 18.75 4.41406 18.75 5.9375V12.5C18.75 16.6406 15.3516 20 11.2109 20H9.92188C7.69531 20 5.50781 19.0625 3.98438 17.4219L0.820312 14.0234C0.273438 13.4375 0 12.6953 0 11.9141C0 10.1562 1.40625 8.75 3.125 8.75C3.32031 8.75 3.51562 8.78906 3.75 8.82812V4.0625C3.75 2.53906 5 1.25 6.5625 1.25C6.79688 1.25 7.03125 1.28906 7.26562 1.36719C7.77344 0.546875 8.67188 0 9.6875 0C10.6641 0 11.5625 0.546875 12.0703 1.36719C12.3047 1.28906 12.5391 1.25 12.8125 1.25C14.0234 1.25 15.0781 2.07031 15.4688 3.16406C15.625 3.16406 15.7812 3.125 15.9375 3.125ZM16.875 12.5V5.9375C16.875 5.42969 16.4453 5 15.8984 5C15.3516 5 14.9609 5.42969 14.9609 5.9375V10C14.9609 10.3516 14.6484 10.625 14.3359 10.625C13.9844 10.625 13.7109 10.3516 13.7109 10V4.0625C13.7109 3.55469 13.2812 3.125 12.7734 3.125C12.2266 3.125 11.8359 3.55469 11.8359 4.0625V10C11.8359 10.3516 11.5234 10.625 11.2109 10.625C10.8984 10.625 10.625 10.3516 10.625 10V2.8125C10.625 2.30469 10.1953 1.875 9.6875 1.875C9.14062 1.875 8.75 2.30469 8.75 2.8125V10C8.75 10.3516 8.39844 10.625 8.08594 10.625C7.73438 10.625 7.46094 10.3516 7.46094 10V4.0625C7.46094 3.55469 6.99219 3.125 6.52344 3.125C6.01562 3.125 5.625 3.55469 5.625 4.0625V11.9531C5.625 12.1484 5.46875 12.2656 5.27344 12.2656C5.19531 12.2656 5.11719 12.2266 5.07812 12.1484L4.02344 11.0547C3.78906 10.7812 3.4375 10.625 3.125 10.625C2.61719 10.625 1.875 11.0156 1.875 11.875C1.875 12.1875 1.99219 12.5391 2.26562 12.8125L5.35156 16.1719C6.5625 17.4219 8.20312 18.125 9.92188 18.125H11.25C14.3359 18.125 16.875 15.625 16.875 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ShieldSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 0C10.1562 0 10.3516 0.0390625 10.5078 0.117188L17.8516 3.24219C18.7109 3.63281 19.375 4.45312 19.375 5.46875C19.3359 9.375 17.7344 16.4453 11.0156 19.6875C10.3516 20 9.60938 20 8.94531 19.6875C2.22656 16.4453 0.625 9.375 0.625 5.46875C0.585938 4.45312 1.25 3.63281 2.10938 3.24219L9.45312 0.117188C9.60938 0.0390625 9.80469 0 10 0ZM10 2.61719V17.3828C15.3906 14.7656 16.8359 9.02344 16.875 5.54688L10 2.61719Z"
        fill="currentColor"
      />
    </svg>
  );
};
