type NewIconProps = {
  $color?: string | undefined;
};

const NewIcon = ({ $color }: NewIconProps) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.4501 8H7.88834V14.3638H6.24009L5.38733 10.4431V14.3638H4V8H5.66734L6.4501 11.8836V8Z"
      fill={$color}
    />
    <path
      d="M8.50531 14.3638V8H11.7891V9.44059H10.0326V10.4208H11.6745V11.8094H10.0326V12.9158H11.8591V14.3564H8.50531V14.3638Z"
      fill={$color}
    />
    <path
      d="M16.231 12.5074L16.5619 8H18.0002L17.0965 14.3638H15.461L15.0028 10.0866H14.9901L14.5573 14.3638H12.89L11.9927 8H13.4755L13.8318 12.5074H13.8446L14.3346 8H15.6774L16.2183 12.5074H16.231Z"
      fill={$color}
    />
    <circle cx="11" cy="11" r="10" stroke={$color} strokeWidth="2" />
  </svg>
);

export default NewIcon;
