``` jsx

function EmailForm() {
    const [value, setValue] = useState("")
    return (
        <div className="grid w-full max-w-md gap-4">
            <InputGroup>
                <InputGroupText className="bg-black w-full p-4 h-64 items-start flex flex-col">
                    <div>
                        探索 AI 的無限可能
                    </div>
                    {/* <div className="text-sm">bash — 80x24</div> */}
                </InputGroupText>
                <InputGroupAddon align="block-start" className="border-b">
                    <InputGroupText className="font-mono font-medium">
                        <SquareTerminal />
                        Sign in with Holon

                    </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="block-end" className="bg-black justify-between">
                    <div className="flex-1 bg-black p-0 font-mono text-primary cursor-text flex items-center">
                        <span className="mr-2">➜</span>
                        <div className="relative">
                            {/* 實際輸入層：文字設為透明，但游標隱藏 */}
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="absolute inset-0 bg-transparent text-transparent border-none outline-none caret-transparent w-full z-10"
                                autoFocus
                            />

                            {/* 顯示層：渲染文字 + 閃爍光標 */}
                            <div className="flex items-center whitespace-pre">
                                <span>{value}</span>
                                {value.length === 0 && <span className="absolute left-1 text-primary pointer-events-none peer-focus:hidden peer-[:not(:placeholder-shown)]:hidden">
                                    enter email...
                                </span>}
                                <span className="w-1 h-5 bg-primary animate-[blink_1s_steps(2,start)_infinite] shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button size="icon" variant="ghost" className="text-muted-foreground">
                            <LogIn />
                        </Button>
                    </div>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
```