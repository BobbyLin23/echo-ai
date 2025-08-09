export default function Layout({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return (
		<div className="flex min-h-svh items-center justify-center">{children}</div>
	)
}
