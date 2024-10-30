const SvgBG = () => {
  return (
    <svg
      className="absolute inset-0 -z-10 h-full w-full stroke-orange-500/20 [mask-image:radial-gradient(100%_100%_at_top_right,black,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="halloween-pattern"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 200V0H200" fill="none" />
          {/* Adding subtle Halloween shapes */}
          <circle cx="50" cy="50" r="10" fill="orange" />
          <circle cx="150" cy="150" r="10" fill="purple" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill="url(#halloween-pattern)"
      />
    </svg>
  );
};

export default SvgBG;
