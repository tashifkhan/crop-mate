import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface DialogBoxProps {
	title: string;
	displayContent: string;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DialogBox({
	title,
	displayContent,
	isOpen,
	onOpenChange,
}: DialogBoxProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="space-y-2">
				<DialogHeader>
					<DialogTitle className="pb-2">{title}</DialogTitle>
				</DialogHeader>
				<p className="whitespace-pre-line">{displayContent}</p>
			</DialogContent>
		</Dialog>
	);
}

export default DialogBox;
