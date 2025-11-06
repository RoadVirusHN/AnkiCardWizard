interface SvgIconProps {
  svg_path : string // SVG File path in public folder
  size?: number | string // Scale factor for the icon
  overrided_style? : React.CSSProperties // Optional style to override default styles
}

const SvgIcon = ({svg_path, size, overrided_style} : SvgIconProps) => {

  return <svg path={svg_path} scale={size} style={overrided_style}/>;
};
export default SvgIcon;