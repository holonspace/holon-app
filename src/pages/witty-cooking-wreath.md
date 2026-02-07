# Plan: ChatHumanMessage 固定高度與可展開功能

## 目標

- ChatHumanMessage 預設顯示固定高度（收合狀態）
- 內容超過時顯示省略號（ellipsis）
- 點擊可展開顯示完整內容

## 當前問題

目前的實作將內容放在 `CollapsibleContent` 內，導致預設狀態下內容完全隱藏，而非顯示截斷的預覽。

## 實作方案

### 修改 `src/components/chat/chat-message.tsx`

1. **使用 `useState` 控制展開狀態**
   - 新增 `isOpen` state 來追蹤展開/收合狀態

2. **移除 CollapsibleContent 包裹**
   - 內容直接顯示，不使用 `CollapsibleContent`
   - 透過 CSS 類別控制高度限制

3. **CSS 樣式實作**
   - 收合狀態：`max-h-20 overflow-hidden` + `line-clamp-3`（約 3 行高度）
   - 展開狀態：移除高度限制

4. **Collapsible 使用 controlled mode**
   ```tsx
   <Collapsible open={isOpen} onOpenChange={setIsOpen}>
   ```

## 修改後的程式碼結構

```tsx
function ChatHumanMessage({ content }: ChatItemMessageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-end gap-4">
        <div className="flex flex-col">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
              <span className="sr-only">Toggle details</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <Card className="w-[70%] relative">
          <div className="absolute top-0 right-0 size-3 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)]" />
          <CardContent className="text-base text-foreground/80 font-normal">
            <div
              className={cn(
                "transition-all duration-200",
                !isOpen && "line-clamp-3"
              )}
            >
              {content}
            </div>
          </CardContent>
        </Card>
      </div>
    </Collapsible>
  )
}
```

## 需要的 imports

- 新增 `useState` from react
- 新增 `cn` from `@/lib/utils`

## 驗證方式

1. 執行 `pnpm dev` 啟動開發伺服器
2. 進入聊天頁面
3. 發送一則長訊息（超過 3 行）
4. 確認預設顯示截斷內容並有省略號
5. 點擊展開按鈕確認完整內容顯示
6. 再次點擊確認可收合
