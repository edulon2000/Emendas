
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'; // Importando Switch se não existir, se não usar um similar. Assumindo que existe um Switch em ui.
import { toast } from 'sonner';

// Se o componente Switch não existir em ui, você pode criar um simples ou usar um input checkbox estilizado.
// Para este exemplo, vou assumir que src/components/ui/switch.tsx existe.
// Se não existir, pode ser criado assim:
// import * as SwitchPrimitives from "@radix-ui/react-switch"
// const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(({ className, ...props }, ref) => (
//   <SwitchPrimitives.Root className={cn("peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className)} {...props} ref={ref}>
//     <SwitchPrimitives.Thumb className={cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")} />
//   </SwitchPrimitives.Root>
// ))
// Switch.displayName = SwitchPrimitives.Root.displayName
// export { Switch }
// E adicione cn ao import do utils.ts

export default function Settings() {
  const [userName, setUserName] = useState('Usuário Padrão');
  const [userEmail, setUserEmail] = useState('usuario@exemplo.com');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // Carregar configurações do localStorage ao montar
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) setUserName(storedUserName);
    
    const storedEmailNotifications = localStorage.getItem('emailNotifications');
    if (storedEmailNotifications) setEmailNotifications(JSON.parse(storedEmailNotifications));

    const storedPushNotifications = localStorage.getItem('pushNotifications');
    if (storedPushNotifications) setPushNotifications(JSON.parse(storedPushNotifications));

  }, []);

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast.success('Tema alterado para Escuro.');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast.success('Tema alterado para Claro.');
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    toast.success('Perfil salvo com sucesso!');
  };

  const handleNotificationChange = (type: 'email' | 'push', value: boolean) => {
    if (type === 'email') {
      setEmailNotifications(value);
      localStorage.setItem('emailNotifications', JSON.stringify(value));
    } else {
      setPushNotifications(value);
      localStorage.setItem('pushNotifications', JSON.stringify(value));
    }
    toast.success('Preferências de notificação salvas.');
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Configurações</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Perfil do Usuário</CardTitle>
          <CardDescription>Gerencie suas informações de perfil.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <Label htmlFor="userName">Nome</Label>
              <Input id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input id="userEmail" type="email" value={userEmail} disabled />
              <p className="text-xs text-gray-500 mt-1">O email não pode ser alterado.</p>
            </div>
            <Button type="submit">Salvar Perfil</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>Personalize a aparência da aplicação.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="text-base">Modo Escuro</Label>
            <Switch
              id="darkMode"
              checked={isDarkMode}
              onCheckedChange={handleThemeChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>Escolha como você recebe notificações.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="flex flex-col">
              <span>Notificações por Email</span>
              <span className="text-xs text-gray-500">Receba atualizações importantes por email.</span>
            </Label>
            <Switch
              id="emailNotifications"
              checked={emailNotifications}
              onCheckedChange={(value) => handleNotificationChange('email', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pushNotifications" className="flex flex-col">
              <span>Notificações Push</span>
               <span className="text-xs text-gray-500">Receba alertas em tempo real (simulado).</span>
            </Label>
            <Switch
              id="pushNotifications"
              checked={pushNotifications}
              onCheckedChange={(value) => handleNotificationChange('push', value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
