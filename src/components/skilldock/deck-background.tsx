export function DeckBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10rem] top-[-12rem] size-[28rem] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-[-8rem] top-[-10rem] size-[32rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute bottom-[-14rem] left-1/3 size-[30rem] rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/8 to-transparent" />
    </div>
  );
}
