import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerPolicy } from "./components/customer-policy";
import { UserPolicy } from "./components/user-policy";

export function Terms() {
	return (
		<div className="flex justify-center p-8">
			<div className="w-full max-w-7xl">
				<h1 className="mb-4 font-bold text-3xl tracking-tight">
					Política de Privacidade de Dados
				</h1>
				<Tabs defaultValue="users">
					<TabsList className="mb-4 md:h-8">
						<TabsTrigger value="users">Colaboradores</TabsTrigger>
						<TabsTrigger value="customers">Clientes</TabsTrigger>
					</TabsList>
					<TabsContent value="users">
						<UserPolicy />
					</TabsContent>
					<TabsContent value="customers">
						<CustomerPolicy />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
