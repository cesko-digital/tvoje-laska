type Props = {
  width: string | number;
  height?: string | number;
};

export const SignOutSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.48901 20.375C9.48901 21.0312 8.97339 21.5 8.36401 21.5H4.98901C2.45776 21.5 0.489014 19.5312 0.489014 17V5C0.489014 2.51562 2.45776 0.5 4.98901 0.5H8.36401C8.97339 0.5 9.48901 1.01562 9.48901 1.625C9.48901 2.28125 8.97339 2.75 8.36401 2.75H4.98901C3.72339 2.75 2.73901 3.78125 2.73901 5V17C2.73901 18.2656 3.72339 19.25 4.98901 19.25H8.36401C8.97339 19.25 9.48901 19.7656 9.48901 20.375ZM24.1609 10.25L18.2078 3.875C17.7859 3.40625 17.0828 3.40625 16.614 3.82812C16.1453 4.25 16.1453 4.95312 16.5671 5.42188L20.739 9.875H9.06714C8.45776 9.875 7.98901 10.3906 7.98901 11C7.98901 11.6562 8.45776 12.125 9.06714 12.125H20.6921L16.4734 16.625C16.0515 17.0938 16.0515 17.7969 16.5203 18.2188C16.8015 18.4062 17.0828 18.5 17.3171 18.5C17.5984 18.5 17.8796 18.4062 18.114 18.1719L24.0671 11.7969C24.5828 11.375 24.5828 10.6719 24.1609 10.25Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RemoveSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.8125 3.625C17.3203 3.625 17.75 4.05469 17.75 4.5625C17.75 5.10937 17.3203 5.5 16.8125 5.5H16.3438L15.4063 18.1953C15.2891 19.5234 14.2344 20.5 12.9063 20.5L5.05469 20.5C3.72656 20.5 2.67188 19.5234 2.55469 18.1953L1.61719 5.5L1.1875 5.5C0.640625 5.5 0.25 5.10938 0.25 4.5625C0.25 4.05469 0.640625 3.625 1.1875 3.625H3.88281L5.32812 1.47656C5.71875 0.890625 6.42188 0.5 7.16406 0.5L10.7969 0.5C11.5391 0.5 12.2422 0.890625 12.6328 1.47656L14.0781 3.625L16.8125 3.625ZM7.16406 2.375C7.04688 2.375 6.92969 2.45312 6.89063 2.53125L6.14844 3.625L11.8125 3.625L11.0703 2.53125C11.0312 2.45312 10.9141 2.375 10.7969 2.375L7.16406 2.375ZM14.4688 5.5L3.49219 5.5L4.42969 18.0781C4.46875 18.3906 4.74219 18.625 5.05469 18.625L12.9063 18.625C13.2188 18.625 13.4922 18.3906 13.5313 18.0781L14.4688 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const AddFriendSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.95605 10.5C6.18262 10.5 3.95605 8.27344 3.95605 5.5C3.95605 2.76562 6.18262 0.5 8.95605 0.5C11.6904 0.5 13.9561 2.76562 13.9561 5.5C13.9561 8.27344 11.6904 10.5 8.95605 10.5ZM8.95605 2.375C7.19824 2.375 5.83105 3.78125 5.83105 5.5C5.83105 7.25781 7.19824 8.625 8.95605 8.625C10.6748 8.625 12.0811 7.25781 12.0811 5.5C12.0811 3.78125 10.6748 2.375 8.95605 2.375ZM10.9092 12.375C14.6592 12.375 17.7061 15.4219 17.7061 19.1719C17.7061 19.9141 17.0811 20.5 16.3389 20.5H1.53418C0.791992 20.5 0.206055 19.9141 0.206055 19.1719C0.206055 15.4219 3.21387 12.375 6.96387 12.375H10.9092ZM2.08105 18.625H15.792C15.4795 16.2031 13.4482 14.25 10.9092 14.25H6.96387C4.4248 14.25 2.35449 16.2031 2.08105 18.625ZM24.2686 8.3125C24.7764 8.3125 25.2061 8.74219 25.2061 9.25C25.2061 9.79688 24.7764 10.1875 24.2686 10.1875H22.3936V12.0625C22.3936 12.6094 21.9639 13 21.4561 13C20.9092 13 20.5186 12.6094 20.5186 12.0625V10.1875H18.6436C18.0967 10.1875 17.7061 9.79688 17.7061 9.25C17.7061 8.74219 18.0967 8.3125 18.6436 8.3125H20.5186V6.4375C20.5186 5.92969 20.9092 5.5 21.4561 5.5C21.9639 5.5 22.3936 5.92969 22.3936 6.4375V8.3125H24.2686Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SendMessageSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.3125 10.125C11.8203 10.125 12.25 10.5547 12.25 11.0625C12.25 11.6094 11.8203 12 11.3125 12H6.9375C6.39063 12 6 11.6094 6 11.0625C6 10.5547 6.39063 10.125 6.9375 10.125H11.3125ZM15.0625 6.375C15.5703 6.375 16 6.80469 16 7.3125C16 7.85937 15.5703 8.25 15.0625 8.25L6.9375 8.25C6.39063 8.25 6 7.85937 6 7.3125C6 6.80469 6.39063 6.375 6.9375 6.375L15.0625 6.375ZM11 0.75C16.5078 0.75 20.9609 4.46094 20.9609 8.91406C20.9609 13.3672 16.5078 17 11 17C9.71094 17 8.46094 16.8047 7.36719 16.4531C6.19531 17.2734 4.32031 18.25 1.9375 18.25C1.54688 18.25 1.19531 18.0547 1.07813 17.6641C0.960938 17.3125 1 16.9219 1.27344 16.6484C1.27344 16.6484 2.48438 15.3203 3.07031 13.7969C1.78125 12.4297 1 10.7109 1 8.875C1 4.38281 5.45313 0.75 11 0.75ZM11 15.125C15.4531 15.125 19.0469 12.3516 19.0469 8.875C19.0469 5.4375 15.4141 2.625 10.9609 2.625C6.50781 2.625 2.875 5.4375 2.875 8.875C2.875 10.5547 3.69531 11.8047 4.39844 12.5469L5.21875 13.4062L4.78906 14.5C4.59375 15.0469 4.32031 15.5938 4.00781 16.0625C4.94531 15.75 5.72656 15.3203 6.27344 14.9297L7.01563 14.3828L7.91406 14.6562C8.89063 14.9688 9.94531 15.125 11 15.125Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EditProfileSvg = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.5703 1.47656C15.6641 0.382812 17.4219 0.382812 18.5156 1.47656L19.0234 1.98437C20.1172 3.07812 20.1172 4.83594 19.0234 5.92969L11.2891 13.6641C10.9766 13.9766 10.5469 14.25 10.0781 14.3672L6.17188 15.5C5.85938 15.5781 5.50781 15.5 5.27344 15.2266C5 14.9922 4.92188 14.6406 5 14.3281L6.13281 10.4219C6.25 9.95312 6.52344 9.52344 6.83594 9.21094L14.5703 1.47656ZM17.1875 2.80469C16.8359 2.45312 16.25 2.45312 15.8984 2.80469L14.7266 3.9375L16.5625 5.77344L17.6953 4.60156C18.0469 4.25 18.0469 3.66406 17.6953 3.3125L17.1875 2.80469ZM7.92969 10.9297L7.26563 13.2344L9.57031 12.5703C9.72656 12.5312 9.84375 12.4531 9.96094 12.3359L15.2344 7.0625L13.4375 5.26562L8.16406 10.5391C8.04688 10.6562 7.96875 10.7734 7.92969 10.9297ZM7.8125 3C8.32031 3 8.75 3.42969 8.75 3.9375C8.75 4.48437 8.32031 4.875 7.8125 4.875L3.4375 4.875C2.53906 4.875 1.875 5.57812 1.875 6.4375L1.875 17.0625C1.875 17.9609 2.53906 18.625 3.4375 18.625L14.0625 18.625C14.9219 18.625 15.625 17.9609 15.625 17.0625V12.6875C15.625 12.1797 16.0156 11.75 16.5625 11.75C17.0703 11.75 17.5 12.1797 17.5 12.6875V17.0625C17.5 18.9766 15.9375 20.5 14.0625 20.5L3.4375 20.5C1.52344 20.5 0 18.9766 0 17.0625L0 6.4375C0 4.5625 1.52344 3 3.4375 3L7.8125 3Z"
        fill="currentColor"
      />
    </svg>
  );
};
