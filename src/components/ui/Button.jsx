const sizes = {
  sm: "h-9 px-4 text-xs",

  md: "h-11 px-6 text-sm",

  lg: "h-12 px-8 text-base",
};

export default function Button({
  children,

  variant = "primary",

  size = "md",

  className,

  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 ease-out active:scale-[0.97] cursor-pointer select-none",

        variants[variant],

        sizes[size],

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
