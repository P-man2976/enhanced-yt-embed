import { IconType } from "react-icons/lib";

export default function Icon ({ icon, className }: { icon: IconType; className?: string }) {

	return (
		<div className={className}>
			{icon({ size: '100%' })}
		</div>
	)

}
