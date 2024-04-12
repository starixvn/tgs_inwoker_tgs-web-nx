type ContactProps = {
  $color?: string | undefined;
};

const Contact = ({ $color }: ContactProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path fill={$color} d="M12.1818 2.73022C7.66364 2.73022 4 6.39386 4 10.912V17.2757C4 18.7848 5.21818 20.003 6.72727 20.003H9.45455V12.7302H5.81818V10.912C5.81818 7.39386 8.66364 4.54841 12.1818 4.54841C15.7 4.54841 18.5455 7.39386 18.5455 10.912V12.7302H14.9091V20.003H18.5455V20.912H12.1818V22.7302H17.6364C19.1455 22.7302 20.3636 21.512 20.3636 20.003V10.912C20.3636 6.39386 16.7 2.73022 12.1818 2.73022Z" />
    </svg>
  )
};

export default Contact;