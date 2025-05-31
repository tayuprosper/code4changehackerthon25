// components/CustomButton.jsx

const variants = {
  primary: "bg-[#0B081D] text-white hover:bg-[#000411] shadow-md", // Bold dark button
  secondary: "bg-[#646C6F] text-white hover:bg-[#62626E] shadow-sm", // Soft dark gray
  accent: "bg-[#AEB7B3] text-[#0B081D] hover:bg-[#C8D3CD] shadow-md", // Clean contrasty minty-gray
  outline: "border border-[#0B081D] text-[#0B081D] hover:bg-[#E1EFE6]", // Minimal clean outline
  ghost: "text-[#0B081D] hover:bg-[#E1EFE6]", // Transparent + hover
  soft: "bg-[#E1EFE6] text-[#0B081D] hover:bg-[#C8D3CD] shadow-sm", // Soft muted CTA
  default: "bg-gray-200 text-black hover:bg-gray-300", // Fallback
};

const CustomButton = ({
  type = "button",
  onClick,
  route,
  Icon,
  text,
  variant = "default",
  as = "button", // either 'button' or 'link'
}) => {
  const classes = `flex items-center text-center gap-2 px-4 py-2 rounded-xl transition duration-200 text-sm font-medium ${variants[variant]}`;
  const optionclass = `px-4 py-2 rounded-xl items-center ${variants[variant]}`;
  const choiceclass = `items-center justify-center text-center font-semibold font-serif rounded-2xl shadow-lg text-[25px] py-4 ${variants[variant]}`;

  if (as === "link" && route) {
    return (
      <a href={route} className={classes}>
        {Icon && <Icon className="w-4 h-4" />}
        {text}
      </a>
    );
  }
  if (as === "option" && route) {
    return (
      <a href={route} className={optionclass}>
        {text}
      </a>
    );
  }
  if (as === "choice" && route) {
    return (
      <a href={route} className={choiceclass}>
        {text}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </button>
  );
};

export default CustomButton;
