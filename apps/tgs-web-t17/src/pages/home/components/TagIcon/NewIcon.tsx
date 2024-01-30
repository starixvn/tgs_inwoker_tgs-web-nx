type NewIconProps = {
  $color?: string | undefined;
};

const NewIcon = ({ $color }: NewIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
    <path fill={$color} d="M6.7001 8.22852H8.13834V14.5923H6.49009L5.63733 10.6716V14.5923H4.25V8.22852H5.91734L6.7001 12.1122V8.22852Z" />
    <path fill={$color} d="M8.75537 14.5923V8.22852H12.0391V9.6691H10.2827V10.6493H11.9246V12.0379H10.2827V13.1443H12.1091V14.5849H8.75537V14.5923Z" />
    <path fill={$color} d="M16.481 12.7359L16.8119 8.22852H18.2502L17.3465 14.5923H15.711L15.2528 10.3151H15.2401L14.8073 14.5923H13.14L12.2427 8.22852H13.7255L14.0818 12.7359H14.0946L14.5846 8.22852H15.9274L16.4683 12.7359H16.481Z" />
    <circle cx="11.25" cy="11.2285" r="10" stroke={$color} strokeWidth="2" />
  </svg>
);

export default NewIcon;
