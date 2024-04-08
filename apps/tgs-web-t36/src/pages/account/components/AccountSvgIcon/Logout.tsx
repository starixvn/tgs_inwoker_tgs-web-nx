type LogoutProps = {
  $color?: string | undefined;
};

const Logout = ({ $color }: LogoutProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path fill={$color} d="M16.5 8.10989L15.231 9.37889L17.553 11.7099H8.4V13.5099H17.553L15.231 15.8319L16.5 17.1099L21 12.6099L16.5 8.10989ZM4.8 6.30989H12V4.50989H4.8C3.81 4.50989 3 5.31989 3 6.30989V18.9099C3 19.8999 3.81 20.7099 4.8 20.7099H12V18.9099H4.8V6.30989Z" />
    </svg>
  )
};

export default Logout;