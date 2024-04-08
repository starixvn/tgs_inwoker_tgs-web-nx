type DownloadProps = {
  $color?: string | undefined;
};

const Download = ({ $color }: DownloadProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path fill={$color} d="M19 12.0299V19.0299H5V12.0299H3V19.0299C3 20.1299 3.9 21.0299 5 21.0299H19C20.1 21.0299 21 20.1299 21 19.0299V12.0299H19ZM13 12.6999L15.59 10.1199L17 11.5299L12 16.5299L7 11.5299L8.41 10.1199L11 12.6999V3.02991H13V12.6999Z" />
    </svg>
  )
};

export default Download;