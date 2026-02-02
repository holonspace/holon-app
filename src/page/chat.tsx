import { AuthMenu } from "@/components/auth"
import { ChatForm, ChatMessage, ChatModelSelector } from "@/components/chat"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import "@/styles/streamdown.css"
import { LayoutDashboard } from "lucide-react"
import { Link } from "wouter"
import myDoc from './witty-cooking-wreath.md?raw'

export default function ChatPage() {
    return (
        <ChatSidebar className="min-h-screen flex flex-col [--chat-content-max-width:768px]">
            <header className="sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 pr-4 md:pl-4 pl-12 bg-background 2xl:bg-transparent z-2">
                <ChatModelSelector />
                <RightSideMenu />
            </header>
            <div className="flex-1 flex flex-col mx-4">
                <div className="flex-1">
                    <div className="my-6 mx-auto w-(--chat-content-max-width) flex flex-col gap-6">
                        <ChatMessage role="human" content={`<main data-slot="sidebar-inset" class="bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 relative flex w-full flex-1 flex-col"><header class="flex h-14 shrink-0 items-center justify-between gap-2 px-4 "><button data-slot="dropdown-menu-trigger" data-variant="ghost" data-size="default" class="cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-none border border-transparent bg-clip-padding font-medium focus-visible:ring-1 aria-invalid:ring-1 [&amp;_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none shrink-0 [&amp;_svg]:shrink-0 outline-none group/button select-none hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 gap-2 h-10 text-base" type="button" id="radix-_r_0_" aria-haspopup="menu" aria-expanded="false" data-state="closed">ChatGPT 5.1<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button><a href="/dashboard"><button data-slot="button" data-variant="ghost" data-size="default" class="cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-none border border-transparent bg-clip-padding text-xs font-medium focus-visible:ring-1 aria-invalid:ring-1 [&amp;_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none shrink-0 [&amp;_svg]:shrink-0 outline-none group/button select-none hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 h-10 text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard size-5" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>Dashboard</button></a></header><div class="flex-1 flex flex-col"><div class="flex-1 mx-auto [--chat-content-max-width:768px] w-(--chat-content-max-width)"><div class="sticky bottom-0"><div role="group" data-slot="field" data-orientation="vertical" class="data-[invalid=true]:text-destructive gap-2 group/field flex w-full flex-col [&amp;&gt;*]:w-full [&amp;&gt;.sr-only]:w-auto"><label data-slot="field-label" class="text-xs group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[&gt;[data-slot=field]]:rounded-none has-[&gt;[data-slot=field]]:border [&amp;&gt;*]:data-[slot=field]:p-2 group/field-label peer/field-label flex w-fit leading-snug has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col sr-only" for="prompt">Prompt</label><div data-slot="input-group" role="group" class="border-input dark:bg-input/30 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-disabled:bg-input/50 dark:has-disabled:bg-input/80 h-8 rounded-none border transition-colors has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-1 has-[[data-slot][aria-invalid=true]]:ring-1 has-[&gt;[data-align=block-end]]:h-auto has-[&gt;[data-align=block-end]]:flex-col has-[&gt;[data-align=block-start]]:h-auto has-[&gt;[data-align=block-start]]:flex-col has-[&gt;[data-align=block-end]]:[&amp;&gt;input]:pt-3 has-[&gt;[data-align=block-start]]:[&amp;&gt;input]:pb-3 has-[&gt;[data-align=inline-end]]:[&amp;&gt;input]:pr-1.5 has-[&gt;[data-align=inline-start]]:[&amp;&gt;input]:pl-1.5 [[data-slot=combobox-content]_&amp;]:focus-within:border-inherit [[data-slot=combobox-content]_&amp;]:focus-within:ring-0 group/input-group relative flex w-full min-w-0 items-center outline-none has-[&gt;textarea]:h-auto"><textarea data-slot="input-group-control" class="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 text-xs transition-colors placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent flex-1 resize-none textbase md:text-base p-4" id="prompt" placeholder="Ask anything"></textarea><div role="group" data-slot="input-group-addon" data-align="block-end" class="text-muted-foreground h-auto gap-2 py-1.5 text-xs font-medium group-data-[disabled=true]/input-group:opacity-50 [&amp;&gt;kbd]:rounded-none [&amp;&gt;svg:not([class*='size-'])]:size-4 flex cursor-text items-center select-none px-2.5 pb-2 group-has-[&gt;input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start"><button data-slot="dropdown-menu-trigger" data-variant="ghost" data-size="icon-sm" class="cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding font-medium focus-visible:ring-1 aria-invalid:ring-1 [&amp;_svg:not([class*='size-'])]:size-4 justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none shrink-0 [&amp;_svg]:shrink-0 outline-none group/button select-none hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 gap-2 text-xs shadow-none flex items-center size-8 p-0 has-[&gt;svg]:p-0 rounded-4xl" type="button" id="radix-_r_4_" aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg></button><button data-slot="button" data-variant="default" data-size="icon-sm" class="cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding font-medium focus-visible:ring-1 aria-invalid:ring-1 [&amp;_svg:not([class*='size-'])]:size-4 justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none shrink-0 [&amp;_svg]:shrink-0 outline-none group/button select-none bg-primary text-primary-foreground [a]:hover:bg-primary/80 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 gap-2 text-xs shadow-none flex items-center size-8 p-0 has-[&gt;svg]:p-0 ml-auto rounded-4xl" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up" aria-hidden="true"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg></button></div></div></div></div></div></div></main>`} />
                        <ChatMessage role="ai" content={myDoc} />
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 bg-background">
                <div className="w-(--chat-content-max-width) mx-auto mb-4">
                    <ChatForm />
                </div>
            </div>
        </ChatSidebar >
    )
}

function MenuButton(props: React.ComponentProps<typeof Button>) {
    return (
        <Button variant="ghost" className="h-10 text-muted-foreground" {...props} />
    )
}

function RightSideMenu() {
    const { status } = useAuth()

    if (status === "loading") return null
    if (status === "unauthenticated") return (
        <Link to="/signin">
            <MenuButton>Sign In / Sign Up</MenuButton>
        </Link>
    )
    return (
        <div className="flex items-center gap-2">
            <Link to="/dashboard">
                <MenuButton>
                    <LayoutDashboard className="size-5" />
                    Dashboard
                </MenuButton>
            </Link>
            <AuthMenu />
        </div>
    )
}