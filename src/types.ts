// extracted from @radix-ui/react-icons
type IconType = React.ForwardRefExoticComponent<
	React.SVGAttributes<SVGElement> & {
		children?: never;
		color?: string;
	} & React.RefAttributes<SVGSVGElement>
>;

type Employee = {
	id: number;
	name: string;
	position: string;
	department: string;
	email: string;
	avatar?: string;
	phone?: string;
	startDate?: string;
};

type NewEmployee = {
	name: string;
	position: string;
	department: string;
	email: string;
	phone?: string;
	startDate?: string;
};
