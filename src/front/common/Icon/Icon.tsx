const Icon = ({url}:{url:string}) => {
  return <div
    style={{
      width: '24px',
      height: '24px',
      backgroundColor: 'var(--color-primary)',
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',
      maskSize: 'contain'
    }}/>;
};
export default Icon;