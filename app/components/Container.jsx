import { cn } from "../utils/cn";

const Container = ({
  children,
  className,
  variant = "default",
  as: Component = "div",
  ...props
}) => {
  const variants = {
    default: "container-custom",
    narrow: "container-narrow",
    wide: "container-wide",
    full: "w-full px-0",
  };

  return (
    <Component className={cn(variants[variant], className)} {...props}>
      {children}
    </Component>
  );
};

export default Container;
