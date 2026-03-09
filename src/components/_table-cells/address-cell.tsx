import type { Address } from "@/api/schemas/address-schema";
import { getDistrict } from "@/utils/districts";

type AddressCellProps = {
	address: Address;
};

export function AddressCell({ address }: AddressCellProps) {
	const complement = address.complement ? `${address.complement},` : "";

	return (
		<div className="max-w-96 truncate">
			{`${address.street}, ${complement} ${address.postalCode}, ${getDistrict(address.district)}`}
		</div>
	);
}
