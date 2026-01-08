import logoPayAu from '../../assets/logos/Logo-PayAu-Full-Colour.png';

export function Logo() {
  return (
    <div className="flex items-center">
      <img
        src={logoPayAu}
        alt="pay.com.au"
        height={32}
        className="h-8 w-auto"
      />
    </div>
  );
}
