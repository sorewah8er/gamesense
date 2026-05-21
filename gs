--[[
--shit replic of gamesense - sk8er
--]]

-- =========================================================================
-- ADONIS BYPASS (i dont think its really working)
-- =========================================================================
getgenv().bypass_adonis = true
if bypass_adonis then
    task.spawn(function()
        pcall(function()
            local g = getinfo or debug.getinfo
            local d = false
            local h = {}
            local x, y
            if setthreadidentity then setthreadidentity(2) end
            for i, v in getgc(true) do
                if typeof(v) == "table" then
                    local a = rawget(v, "Detected")
                    local b = rawget(v, "Kill")
                    if typeof(a) == "function" and not x then
                        x = a
                        local o; o = hookfunction(x, function(c, f, n)
                            if c ~= "_" then if d then end end
                            return true
                        end)
                        table.insert(h, x)
                    end
                    if rawget(v, "Variables") and rawget(v, "Process") and typeof(b) == "function" and not y then
                        y = b
                        local o; o = hookfunction(y, function(f)
                            if d then end
                        end)
                        table.insert(h, y)
                    end
                end
            end
            if getrenv and getrenv().debug and getrenv().debug.info then
                local o; o = hookfunction(getrenv().debug.info, newcclosure(function(...)
                    local a, f = ...
                    if x and a == x then
                        return coroutine.yield(coroutine.running())
                    end
                    return o(...)
                end))
            end
            if setthreadidentity then setthreadidentity(7) end
        end)
    end)
end

-- =========================================================================
-- INITIALIZATION & GLOBALS
-- =========================================================================
if not game:IsLoaded() then game.Loaded:Wait() end

local isExecutor = (hookmetamethod and getgenv and true) or false
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local CoreGui = game:GetService("CoreGui")
local HttpService = game:GetService("HttpService")
local RunService = game:GetService("RunService")
local Players = game:GetService("Players")
local Lighting = game:GetService("Lighting")
local SoundService = game:GetService("SoundService")
local VirtualInputManager = game:GetService("VirtualInputManager")

local LocalPlayer = Players.LocalPlayer
local Camera = workspace.CurrentCamera
local Mouse = LocalPlayer:GetMouse()

if not getgenv().ScriptState then
    getgenv().ScriptState = {
        -- Ragebot
        Rage_Enabled = true,
        Rage_TeamCheck = true,
        Rage_WallCheck = true,
        Rage_AutoShoot = false,
        Rage_FaceTarget = false,
        Rage_Hitchance = 100,
        Rage_DeadKOCheck = false,
        Rage_PredictionEnabled = false,
        Rage_PredictionAmount = 0.165,
        Rage_SilentAim = true,
        Rage_SilentAimRemote = true,
        Rage_RaysPerSecond = 30,
        Rage_RayCount = 3,
        Rage_HitboxScale = 0,
        Rage_AdaptiveRays = false,
        Rage_AdaptiveBaseCount = 2,
        Rage_AdaptiveFactor = 0.01,
        Rage_TargetMode = "Nearest",
        Rage_RayOrigin = "Camera",
        Rage_RayDistanceLimit = 500,
        Rage_FOV = 0,
        Rage_ESPEnabled = true,
        Rage_ESPColor = Color3.fromRGB(25, 255, 50),
        Rage_ESPThickness = 0.05,
        Rage_TVFlagEnabled = true,
        Keybinds = {
            AutoShoot = Enum.KeyCode.Q,
            MenuToggle = Enum.KeyCode.Insert,
        },
        -- Movement
        Movement = {
    CFrameSpeed = {Active = false, Key = "None", Mode = "Toggle"},
    VelocitySpeed = {Active = false, Key = "None", Mode = "Toggle"},
    CFrameFly = {Active = false, Key = "None", Mode = "Toggle"},
    VelocityFly = {Active = false, Key = "None", Mode = "Toggle"},
        },
        CFrameSpeedValue = 2,
        VelocitySpeedValue = 50,
        CFrameFlyValue = 2,
        VelocityFlyValue = 50,
        -- Visuals
        SelfChams = false,
        SelfChamsColor = Color3.fromRGB(255, 100, 0),
        SelfChamsAlpha = 1,
        EnemyChams = false,
        EnemyChamsColor = Color3.fromRGB(255, 0, 0),
        EnemyChamsAlpha = 1,
        Crosshair = false,
        AlignCrosshair = false,
        CrosshairLength = 8,
        CrosshairThickness = 2,
        CrosshairGap = 4,
        CrosshairDot = true,
        CrosshairColor = Color3.fromRGB(0, 255, 0),
        CrosshairAlpha = 1,
        CrosshairGapInertia = 0.5,
        CrosshairSway = 0.5,
        CrosshairSpin = 0,
        -- World
        fovEnabled = false,
        fovValue = 70,
        AmbientEnabled = false,
        AmbientColor = Color3.fromRGB(200, 220, 255),
        TimeEnabled = false,
        TimeSpeed = 1.0,
        TimeFrom = 6.0,
        TimeTo = 18.0,
        CurrentTime = 12.0,
        SelectedSkybox = "Roblox Default",
        SkyboxEnabled = false,
        FogEnabled = false,
        FogStart = 0,
        FogEnd = 1000,
        FogColor = Color3.fromRGB(200, 200, 200),
        BloomEnabled = false,
        BloomIntensity = 1,
        BloomSize = 24,
        BloomThreshold = 2,
        WatermarkEnabled = true,
    }
end

local ScriptState = getgenv().ScriptState

-- =========================================================================
-- WMARK (almost gs)
-- =========================================================================
local WatermarkGui = Instance.new("ScreenGui")
WatermarkGui.Name = "sk8er_watermark"
WatermarkGui.IgnoreGuiInset = true
WatermarkGui.ResetOnSpawn = false
WatermarkGui.ZIndexBehavior = Enum.ZIndexBehavior.Global
pcall(function() WatermarkGui.Parent = (gethui and gethui()) or CoreGui end)
if not WatermarkGui.Parent then
    local playerGui = LocalPlayer:FindFirstChild("PlayerGui") or LocalPlayer:WaitForChild("PlayerGui", 5)
    if playerGui then WatermarkGui.Parent = playerGui end
end

local function createGradient()
    local gradient = Instance.new("UIGradient")
    gradient.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 1);
        NumberSequenceKeypoint.new(0.5, 0);
        NumberSequenceKeypoint.new(1, 1);
    })
    gradient.Rotation = 0
    return gradient
end

local RunService = game:GetService("RunService")
local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- GUI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "Watermark"
screenGui.IgnoreGuiInset = true
screenGui.DisplayOrder = 999          
screenGui.ResetOnSpawn = false        
screenGui.Parent = player:WaitForChild("PlayerGui")


local bgColor = Color3.fromRGB(20, 20, 20)
local textColor = Color3.new(1, 1, 1)


local sideBgGradient = Instance.new("UIGradient")
sideBgGradient.Transparency = NumberSequence.new({
    NumberSequenceKeypoint.new(0, 1),
    NumberSequenceKeypoint.new(0.3, 0),   
    NumberSequenceKeypoint.new(1, 0),   
    NumberSequenceKeypoint.new(1, 1)
})
sideBgGradient.Rotation = 0
sideBgGradient.Parent = sidePanel


local frame = Instance.new("Frame")
frame.Name = "MainFrame"
frame.Size = UDim2.new(0, 125, 0, 20)
frame.Position = UDim2.new(1, 1, 0, 1)
frame.AnchorPoint = Vector2.new(1, 0)
frame.BackgroundColor3 = bgColor
frame.BackgroundTransparency = 0
frame.BorderSizePixel = 0
frame.Parent = screenGui
createGradient().Parent = frame


local topLine = Instance.new("Frame")
topLine.Size = UDim2.new(1, 0, 0, 1)
topLine.BackgroundColor3 = bgColor
topLine.BorderSizePixel = 0
topLine.Parent = frame
createGradient().Parent = topLine


local bottomLine = Instance.new("Frame")
bottomLine.Size = UDim2.new(1, 0, 0, 1)
bottomLine.Position = UDim2.new(0, 0, 1, -1)
bottomLine.BackgroundColor3 = bgColor
bottomLine.BorderSizePixel = 0
bottomLine.Parent = frame
createGradient().Parent = bottomLine


local container = Instance.new("Frame")
container.Name = "TextContainer"
container.Size = UDim2.new(1, -10, 1, 0)
container.Position = UDim2.new(0, 5, 0, 0)
container.BackgroundTransparency = 1
container.Parent = frame

local synapseLabel = Instance.new("TextLabel")
synapseLabel.Size = UDim2.new(0, 110, 0.9, 0)
synapseLabel.Position = UDim2.new(0, x, 0, 0)
synapseLabel.BackgroundTransparency = 1
synapseLabel.Font = Enum.Font.Code
synapseLabel.TextSize = 11
synapseLabel.TextStrokeTransparency = 0.8
synapseLabel.RichText = true
synapseLabel.TextXAlignment = Enum.TextXAlignment.Center
synapseLabel.TextYAlignment = Enum.TextYAlignment.Center
synapseLabel.Text = '<font color="rgb(255,255,255)">game</font><font color="rgb(119,156,39)">sense</font><font color="rgb(255,255,255)">|</font><font color="rgb(255,255,255)">sk8er</font><font color="rgb(255,255,255)">|</font><font color="rgb(255,255,255)">1337</font>'
synapseLabel.Parent = container

-- =========================================================================
-- SIDE INDICATORS (not matching gs)
-- =========================================================================
local SideIndGui = Instance.new("ScreenGui")
SideIndGui.Name = "SideIndicators"
SideIndGui.IgnoreGuiInset = true
SideIndGui.ResetOnSpawn = false
SideIndGui.ZIndexBehavior = Enum.ZIndexBehavior.Global
pcall(function() SideIndGui.Parent = (gethui and gethui()) or CoreGui end)
if not SideIndGui.Parent then
    local playerGui = LocalPlayer:FindFirstChild("PlayerGui") or LocalPlayer:WaitForChild("PlayerGui", 5)
    if playerGui then SideIndGui.Parent = playerGui end
end


local WHITE = Color3.new(1, 1, 1)
local GREEN_ACCENT = Color3.fromRGB(119, 156, 39)  


local function createContainerGradient()
    local grad = Instance.new("UIGradient")
    grad.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 1),
        NumberSequenceKeypoint.new(0.3, 0),
        NumberSequenceKeypoint.new(0.7, 0),
        NumberSequenceKeypoint.new(1, 1)
    })
    grad.Rotation = 0
    return grad
end


local function createIndicatorContainer(yPos, labelText)
    local container = Instance.new("Frame")
    container.Size = UDim2.new(0, 1, 0, 18)  
    container.Position = UDim2.new(0, 10, 0, yPos)
    container.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
    container.BorderSizePixel = 0
    container.Parent = SideIndGui
    createContainerGradient().Parent = container


    local topLine = Instance.new("Frame")
    topLine.Size = UDim2.new(1, 0, 0, 1)
    topLine.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
    topLine.BorderSizePixel = 0
    topLine.Parent = container
    local topGrad = Instance.new("UIGradient", topLine)
    topGrad.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 1),
        NumberSequenceKeypoint.new(0.5, 0),
        NumberSequenceKeypoint.new(1, 1)
    })


    local bottomLine = Instance.new("Frame")
    bottomLine.Size = UDim2.new(1, 0, 0, 1)
    bottomLine.Position = UDim2.new(0, 0, 1, -1)
    bottomLine.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
    bottomLine.BorderSizePixel = 0
    bottomLine.Parent = container
    local bottomGrad = Instance.new("UIGradient", bottomLine)
    bottomGrad.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 1),
        NumberSequenceKeypoint.new(0.5, 0),
        NumberSequenceKeypoint.new(1, 1)
    })


    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, -10, 1, 0)
    label.Position = UDim2.new(0, 5, 0, 0)
    label.BackgroundTransparency = 1
    label.Font = Enum.Font.Code
    label.TextSize = 11
    label.TextColor3 = WHITE
    label.TextXAlignment = Enum.TextXAlignment.Left
    label.TextYAlignment = Enum.TextYAlignment.Center
    label.Text = labelText
    label.Parent = container

    return container, label
end


local indY = 450
local indSpacing = 22


local indicators = {}

local function createIndicator(id, defaultText)
    local container, label = createIndicatorContainer(indY, defaultText)
    indicators[id] = {container = container, label = label}
    indY = indY + indSpacing
    return container, label
end

createIndicator("HC", "HC: 100%")
createIndicator("T", "T: none")
createIndicator("RC", "RC: 0")
createIndicator("RPC", "RPC: 30")
createIndicator("HS", "HS: 0%")
createIndicator("RF", "RF: 0°")
createIndicator("RDL", "RDL: 0")


local function UpdateSideIndicators(target, raysVisible)

    indicators["HC"].label.Text = string.format("HC: %d%%", ScriptState.Rage_Hitchance)
    indicators["HC"].label.TextColor3 = WHITE
    
    if target then
        indicators["T"].label.Text = "T: " .. target.Name
        indicators["T"].label.TextColor3 = GREEN_ACCENT  
    else
        indicators["T"].label.Text = "T: none"
        indicators["T"].label.TextColor3 = WHITE
    end
    
    indicators["RC"].label.Text = "RC: " .. tostring(raysVisible)
    indicators["RC"].label.TextColor3 = WHITE
    
    indicators["RPC"].label.Text = "RPC: " .. tostring(ScriptState.Rage_RaysPerSecond)
    indicators["RPC"].label.TextColor3 = WHITE
    
    indicators["HS"].label.Text = string.format("HS: %d%%", ScriptState.Rage_HitboxScale)
    indicators["HS"].label.TextColor3 = WHITE
    
    indicators["RF"].label.Text = string.format("RF: %d°", ScriptState.Rage_FOV)
    indicators["RF"].label.TextColor3 = WHITE
    
    indicators["RDL"].label.Text = "RDL: " .. tostring(ScriptState.Rage_RayDistanceLimit)
    indicators["RDL"].label.TextColor3 = WHITE
    
    -- Вычисляем самую широкую строку
    local maxWidth = 0
    for id, data in pairs(indicators) do
        local w = data.label.TextBounds.X
        if w > maxWidth then maxWidth = w end
    end
    local finalWidth = maxWidth + 20  
    

    for id, data in pairs(indicators) do
        data.container.Size = UDim2.new(0, finalWidth, 0, 18)
    end
end


task.spawn(function()
    while true do
        task.wait(0.1)
        if SideIndGui then
            SideIndGui.Enabled = ScriptState.WatermarkEnabled
        end
    end
end)

-- =========================================================================
-- CONFIG SYSTEM PREP
-- =========================================================================
if isfolder and not isfolder("sk8er_configs") then
    makefolder("sk8er_configs")
end

local function GetConfigs()
    local list = {}
    if isfolder and listfiles and isfolder("sk8er_configs") then
        for _, file in ipairs(listfiles("sk8er_configs")) do
            local name = file:match("([^/\\]+)%.json$")
            if name then table.insert(list, name) end
        end
    end
    if #list == 0 then table.insert(list, "Default") end
    return list
end

local function round(v, step)
    if not step or step == 0 then return v end
    return math.floor(v / step + 0.5) * step
end

-- =========================================================================
-- UI LIBRARY (is it actually not bad?)
-- =========================================================================
local Library = { Flags = {}, Elements = {} }

local Colors = {
    MainBG = Color3.fromRGB(12, 12, 12),
    SidebarBG = Color3.fromRGB(12, 12, 12),
    SectionBG = Color3.fromRGB(23, 23, 23),
    Border = Color3.fromRGB(0, 0, 0),
    Text = Color3.fromRGB(205, 205, 205),
    TextDark = Color3.fromRGB(130, 130, 130),
    Accent1 = Color3.fromRGB(168, 247, 32), 
    Accent2 = Color3.fromRGB(180, 180, 180),
}

local function RGBtoHSV(color)
    local h, s, v = color:ToHSV()
    return h * 360, s, v
end

local function MakeDraggable(topbarobject, object)
    local Dragging, DragInput, DragStart, StartPosition = nil, nil, nil, nil
    topbarobject.InputBegan:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
            Dragging = true; DragStart = input.Position; StartPosition = object.Position
            input.Changed:Connect(function() if input.UserInputState == Enum.UserInputState.End then Dragging = false end end)
        end
    end)
    topbarobject.InputChanged:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then DragInput = input end
    end)
    UserInputService.InputChanged:Connect(function(input)
        if input == DragInput and Dragging then
            local Delta = input.Position - DragStart
            object.Position = UDim2.new(StartPosition.X.Scale, StartPosition.X.Offset + Delta.X, StartPosition.Y.Scale, StartPosition.Y.Offset + Delta.Y)
        end
    end)
end

function Library:CreateWindow(title)
    local Window = { Tabs = {} }
    local ScreenGui = Instance.new("ScreenGui")
    ScreenGui.Name = "sk8er"
    ScreenGui.ResetOnSpawn = false
    ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Global
    pcall(function() ScreenGui.Parent = (gethui and gethui()) or CoreGui end)
    if not ScreenGui.Parent then
        local playerGui = LocalPlayer:FindFirstChild("PlayerGui") or LocalPlayer:WaitForChild("PlayerGui", 5)
        if playerGui then ScreenGui.Parent = playerGui end
    end

    local MainFrame = Instance.new("Frame")
    MainFrame.Name = "MainFrame"
    MainFrame.Parent = ScreenGui
    MainFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
    MainFrame.BorderMode = Enum.BorderMode.Inset
    MainFrame.BorderColor3 = Color3.fromRGB(12, 12, 12)
    MainFrame.BorderSizePixel = 1
    MainFrame.Position = UDim2.new(0.5, -330, 0.5, -280)
    MainFrame.Size = UDim2.new(0, 660, 0, 560)

    local InnerBorder = Instance.new("Frame")
    InnerBorder.Parent = MainFrame
    InnerBorder.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
    InnerBorder.BorderSizePixel = 0
    InnerBorder.Position = UDim2.new(0, 1, 0, 1)
    InnerBorder.Size = UDim2.new(1, -2, 1, -2)

    local InnerFrame = Instance.new("Frame")
    InnerFrame.Parent = MainFrame
    InnerFrame.BackgroundColor3 = Colors.MainBG
    InnerFrame.BorderMode = Enum.BorderMode.Inset
    InnerFrame.BorderColor3 = Color3.fromRGB(60, 60, 60)
    InnerFrame.BorderSizePixel = 1
    InnerFrame.Position = UDim2.new(0, 3, 0, 3)
    InnerFrame.Size = UDim2.new(1, -6, 1, -6)

       local TopLine = Instance.new("ImageLabel")
    TopLine.Name = "TopLine"
    TopLine.Parent = InnerFrame
    TopLine.BackgroundTransparency = 1
    TopLine.BorderSizePixel = 0
    TopLine.Size = UDim2.new(1, 0, 0, 2)
    TopLine.Image = "rbxassetid://8508019876"
    TopLine.ImageColor3 = Color3.fromRGB(255, 255, 255)
    TopLine.ScaleType = Enum.ScaleType.Stretch

    MakeDraggable(MainFrame, MainFrame)

    local Sidebar = Instance.new("Frame")
    Sidebar.Parent = InnerFrame
    Sidebar.BackgroundColor3 = Colors.SidebarBG
    Sidebar.BorderSizePixel = 0
    Sidebar.Position = UDim2.new(0, 0, 0, 4)
    Sidebar.Size = UDim2.new(0, 74, 1, -4)

    local SidebarLine = Instance.new("Frame")
    SidebarLine.Parent = InnerFrame
    SidebarLine.BackgroundColor3 = Colors.Border
    SidebarLine.BorderSizePixel = 0
    SidebarLine.Position = UDim2.new(0, 74, 0, 4)
    SidebarLine.Size = UDim2.new(0, 1, 1, -4)
    SidebarLine.ZIndex = 2

    local TabListLayout = Instance.new("UIListLayout")
    TabListLayout.Parent = Sidebar
    TabListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
    TabListLayout.SortOrder = Enum.SortOrder.LayoutOrder
    TabListLayout.Padding = UDim.new(0, 4)
    local SidebarPadding = Instance.new("UIPadding")
    SidebarPadding.Parent = Sidebar; SidebarPadding.PaddingTop = UDim.new(0, 9)

    local TabContainer = Instance.new("Frame")
    TabContainer.Parent = InnerFrame
    TabContainer.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
    TabContainer.BorderSizePixel = 0
    TabContainer.Position = UDim2.new(0, 75, 0, 4)
    TabContainer.Size = UDim2.new(1, -75, 1, -4)

    local Pattern = Instance.new("ImageLabel")
    Pattern.Parent = TabContainer
    Pattern.BackgroundTransparency = 1
    Pattern.Size = UDim2.new(1, 0, 1, 0)
    Pattern.Image = "rbxassetid://8547666218"
    Pattern.ImageColor3 = Color3.fromRGB(12, 12, 12)
    Pattern.ScaleType = Enum.ScaleType.Tile
    Pattern.TileSize = UDim2.new(0, 8, 0, 8)
    Pattern.ZIndex = 1

    UserInputService.InputBegan:Connect(function(input, processed)
        if input.KeyCode == Enum.KeyCode.Delete or input.KeyCode == Enum.KeyCode.Insert then
            MainFrame.Visible = not MainFrame.Visible
        end
    end)

    function Window:CreateTab(iconId)
        local Tab = {}
        local TabBtn = Instance.new("TextButton")
        TabBtn.Parent = Sidebar
        TabBtn.BackgroundTransparency = 1
        TabBtn.Size = UDim2.new(1, 0, 0, 72)
        TabBtn.Text = ""

        local TabIcon = Instance.new("ImageLabel")
        TabIcon.Parent = TabBtn
        TabIcon.AnchorPoint = Vector2.new(0.5, 0.5)
        TabIcon.BackgroundTransparency = 1
        TabIcon.Position = UDim2.new(0.5, 0, 0.5, 0)
        TabIcon.Size = UDim2.new(0, 45, 0, 45)
        TabIcon.Image = iconId
        TabIcon.ImageColor3 = Color3.fromRGB(90, 90, 90)
        TabIcon.ZIndex = 10

        local TabBorder = Instance.new("Frame")
        TabBorder.Parent = TabBtn
        TabBorder.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
        TabBorder.BorderSizePixel = 0
        TabBorder.Size = UDim2.new(1, 1, 1, 0)
        TabBorder.Visible = false
        TabBorder.ZIndex = 3

        local TabOutline = Instance.new("Frame")
        TabOutline.Parent = TabBorder
        TabOutline.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
        TabOutline.BorderSizePixel = 0
        TabOutline.Position = UDim2.new(0, 0, 0, 1)
        TabOutline.Size = UDim2.new(1, 0, 1, -2)
        TabOutline.ZIndex = 4

        local TabInner = Instance.new("Frame")
        TabInner.Parent = TabOutline
        TabInner.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
        TabInner.BorderSizePixel = 0
        TabInner.Position = UDim2.new(0, 0, 0, 1)
        TabInner.Size = UDim2.new(1, 1, 1, -2)
        TabInner.ZIndex = 5
        
        local TabPattern = Pattern:Clone()
        TabPattern.Parent = TabInner
        TabPattern.ZIndex = 5

        local TabPage = Instance.new("ScrollingFrame")
        TabPage.Parent = TabContainer
        TabPage.BackgroundTransparency = 1
        TabPage.BorderSizePixel = 0
        TabPage.Position = UDim2.new(0, 20, 0, 20)
        TabPage.Size = UDim2.new(1, -40, 1, -40)
        TabPage.ScrollBarThickness = 0
        TabPage.Visible = false
        TabPage.AutomaticCanvasSize = Enum.AutomaticSize.Y
        TabPage.CanvasSize = UDim2.new(0, 0, 0, 0)
        TabPage.ZIndex = 2

        local LeftCol = Instance.new("Frame")
        LeftCol.Parent = TabPage; LeftCol.BackgroundTransparency = 1; 
        LeftCol.Size = UDim2.new(0.5, -10, 0, 0); LeftCol.AutomaticSize = Enum.AutomaticSize.Y
        local LeftList = Instance.new("UIListLayout", LeftCol)
        LeftList.SortOrder = Enum.SortOrder.LayoutOrder; LeftList.Padding = UDim.new(0, 18)

        local RightCol = Instance.new("Frame")
        RightCol.Parent = TabPage; RightCol.BackgroundTransparency = 1; RightCol.Position = UDim2.new(0.5, 10, 0, 0)
        RightCol.Size = UDim2.new(0.5, -10, 0, 0); RightCol.AutomaticSize = Enum.AutomaticSize.Y
        local RightList = Instance.new("UIListLayout", RightCol)
        RightList.SortOrder = Enum.SortOrder.LayoutOrder; RightList.Padding = UDim.new(0, 18)

        TabBtn.MouseButton1Click:Connect(function()
            for _, otherTab in pairs(Window.Tabs) do
                if otherTab ~= Tab then
                    otherTab.Page.Visible = false
                    otherTab.Border.Visible = false
                    TweenService:Create(otherTab.Icon, TweenInfo.new(0.2), {ImageColor3 = Color3.fromRGB(90, 90, 90)}):Play()
                end
            end
            TabPage.Visible = true
            TabBorder.Visible = true
            TweenService:Create(TabIcon, TweenInfo.new(0.2), {ImageColor3 = Color3.fromRGB(255, 255, 255)}):Play()
        end)

        Tab.Page = TabPage; Tab.Icon = TabIcon; Tab.Border = TabBorder
        table.insert(Window.Tabs, Tab)
        if #Window.Tabs == 1 then 
            TabPage.Visible = true
            TabBorder.Visible = true
            TabIcon.ImageColor3 = Color3.fromRGB(255, 255, 255) 
        end

        function Tab:CreateSection(titleText, side)
            local Section = {}
            local sideFrame = side == "Right" and RightCol or LeftCol

            local GroupBoxOuter = Instance.new("Frame")
            GroupBoxOuter.Parent = sideFrame; GroupBoxOuter.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
            GroupBoxOuter.BorderMode = Enum.BorderMode.Inset; GroupBoxOuter.BorderColor3 = Color3.fromRGB(12, 12, 12)
            GroupBoxOuter.BorderSizePixel = 1; GroupBoxOuter.Size = UDim2.new(1, 0, 0, 20)
            
            local GroupBox = Instance.new("Frame")
            GroupBox.Parent = GroupBoxOuter; GroupBox.BackgroundColor3 = Colors.SectionBG
            GroupBox.BorderSizePixel = 0; GroupBox.Position = UDim2.new(0, 1, 0, 1)
            GroupBox.Size = UDim2.new(1, -2, 1, -2)

            local GroupTitle = Instance.new("TextLabel")
            GroupTitle.Parent = GroupBoxOuter; GroupTitle.BackgroundColor3 = Colors.SectionBG
            GroupTitle.BackgroundTransparency = 1; GroupTitle.BorderSizePixel = 0
            GroupTitle.Position = UDim2.new(0, 12, 0, 0); GroupTitle.Size = UDim2.new(1, -26, 0, 15)
            GroupTitle.Font = Enum.Font.Code; GroupTitle.Text = titleText
            GroupTitle.TextColor3 = Colors.Text; GroupTitle.TextSize = 11
            GroupTitle.TextXAlignment = Enum.TextXAlignment.Left; GroupTitle.ZIndex = 5

            local TitleInline = Instance.new("Frame")
            TitleInline.Parent = GroupBoxOuter; TitleInline.BackgroundColor3 = Colors.SectionBG
            TitleInline.BorderSizePixel = 0; TitleInline.Position = UDim2.new(0, 9, 0, -1)
            TitleInline.Size = UDim2.new(0, GroupTitle.TextBounds.X + 6, 0, 2)
            TitleInline.ZIndex = 5

            task.spawn(function()
                task.wait(0.1)
                TitleInline.Size = UDim2.new(0, GroupTitle.TextBounds.X + 6, 0, 2)
            end)

            local ElementContainer = Instance.new("Frame")
            ElementContainer.Parent = GroupBox; ElementContainer.BackgroundTransparency = 1
            ElementContainer.Position = UDim2.new(0, 0, 0, 15); ElementContainer.Size = UDim2.new(1, 0, 1, -15)
            
            local ElementList = Instance.new("UIListLayout", ElementContainer)
            ElementList.SortOrder = Enum.SortOrder.LayoutOrder; ElementList.Padding = UDim.new(0, 4)
            local ElementPadding = Instance.new("UIPadding", ElementContainer)
            ElementPadding.PaddingLeft = UDim.new(0, 15); ElementPadding.PaddingRight = UDim.new(0, 15)
            ElementPadding.PaddingTop = UDim.new(0, 5); ElementPadding.PaddingBottom = UDim.new(0, 10)

            ElementList:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
                GroupBoxOuter.Size = UDim2.new(1, 0, 0, ElementList.AbsoluteContentSize.Y + 28)
            end)

            function Section:CreateButton(name, callback)
                local BtnHolder = Instance.new("Frame")
                BtnHolder.Parent = ElementContainer; BtnHolder.BackgroundTransparency = 1
                BtnHolder.Size = UDim2.new(1, 0, 0, 24)

                local BtnOutline = Instance.new("Frame")
                BtnOutline.Parent = BtnHolder; BtnOutline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                BtnOutline.BorderSizePixel = 0; BtnOutline.Position = UDim2.new(0, 0, 0, 2)
                BtnOutline.Size = UDim2.new(1, 0, 1, -4)

                local Btn = Instance.new("TextButton")
                Btn.Parent = BtnOutline; Btn.BackgroundColor3 = Color3.fromRGB(36, 36, 36)
                Btn.BorderSizePixel = 0; Btn.Position = UDim2.new(0, 1, 0, 1)
                Btn.Size = UDim2.new(1, -2, 1, -2); Btn.Font = Enum.Font.Code
                Btn.Text = name; Btn.TextColor3 = Colors.Text; Btn.TextSize = 11
                
                local BtnGradient = Instance.new("UIGradient", Btn)
                BtnGradient.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 255)), ColorSequenceKeypoint.new(1, Color3.fromRGB(140, 140, 140))}
                BtnGradient.Rotation = 90
                
                Btn.MouseEnter:Connect(function() BtnGradient.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 255)), ColorSequenceKeypoint.new(1, Color3.fromRGB(180, 180, 180))} end)
                Btn.MouseLeave:Connect(function() BtnGradient.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 255)), ColorSequenceKeypoint.new(1, Color3.fromRGB(140, 140, 140))} end)

                Btn.MouseButton1Click:Connect(function() pcall(callback) end)
            end

            function Section:CreateInput(flagId, name, placeholder, callback)
                local value = ""
                Library.Flags[flagId] = value

                local InputFrame = Instance.new("Frame")
                InputFrame.Parent = ElementContainer; InputFrame.BackgroundTransparency = 1
                InputFrame.Size = UDim2.new(1, 0, 0, 34)

                local Title = Instance.new("TextLabel")
                Title.Parent = InputFrame; Title.BackgroundTransparency = 1
                Title.Size = UDim2.new(1, 0, 0, 14); Title.Font = Enum.Font.Code
                Title.Text = name; Title.TextColor3 = Colors.Text; Title.TextSize = 10
                Title.TextXAlignment = Enum.TextXAlignment.Left

                local Outline = Instance.new("Frame")
                Outline.Parent = InputFrame; Outline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                Outline.BorderSizePixel = 0; Outline.Position = UDim2.new(0, 0, 0, 16)
                Outline.Size = UDim2.new(1, 0, 0, 18)

                local TextBox = Instance.new("TextBox")
                TextBox.Parent = Outline; TextBox.BackgroundColor3 = Color3.fromRGB(36, 36, 36)
                TextBox.BorderSizePixel = 0; TextBox.Position = UDim2.new(0, 1, 0, 1)
                TextBox.Size = UDim2.new(1, -2, 1, -2); TextBox.Font = Enum.Font.Code
                TextBox.Text = ""; TextBox.PlaceholderText = placeholder or ""
                TextBox.TextColor3 = Colors.Text; TextBox.PlaceholderColor3 = Colors.TextDark
                TextBox.TextSize = 10; TextBox.TextXAlignment = Enum.TextXAlignment.Left
                
                local Padding = Instance.new("UIPadding")
                Padding.Parent = TextBox; Padding.PaddingLeft = UDim.new(0, 4)

                TextBox.FocusLost:Connect(function()
                    value = TextBox.Text
                    Library.Flags[flagId] = value
                    pcall(callback, value)
                end)

                Library.Elements[flagId] = function(val)
                    value = tostring(val)
                    TextBox.Text = value
                    Library.Flags[flagId] = value
                    pcall(callback, value)
                end
                return {
                    SetValue = function(self, val) value = tostring(val); TextBox.Text = value; Library.Flags[flagId] = value; pcall(callback, value) end,
                    GetValue = function(self) return value end
                }
            end

            function Section:CreateToggle(flagId, name, default, callback)
                local toggled = default or false
                Library.Flags[flagId] = toggled

                local ToggleFrame = Instance.new("TextButton")
                ToggleFrame.Parent = ElementContainer; ToggleFrame.BackgroundTransparency = 1
                ToggleFrame.Size = UDim2.new(1, 0, 0, 16); ToggleFrame.Text = ""

                local Outline = Instance.new("Frame")
                Outline.Parent = ToggleFrame; Outline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                Outline.BorderSizePixel = 0; Outline.Position = UDim2.new(0, 0, 0.5, -4)
                Outline.Size = UDim2.new(0, 8, 0, 8)

                local Fill = Instance.new("Frame")
                Fill.Parent = Outline; Fill.BackgroundColor3 = toggled and Colors.Accent1 or Color3.fromRGB(77, 77, 77)
                Fill.BorderSizePixel = 0; Fill.Position = UDim2.new(0, 1, 0, 1)
                Fill.Size = UDim2.new(1, -2, 1, -2)

                local FillGradient = Instance.new("UIGradient", Fill)
                FillGradient.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 255)), ColorSequenceKeypoint.new(1, Color3.fromRGB(140, 140, 140))}
                FillGradient.Rotation = 90

                local Title = Instance.new("TextLabel")
                Title.Parent = ToggleFrame; Title.BackgroundTransparency = 1
                Title.Position = UDim2.new(0, 16, 0, 0); Title.Size = UDim2.new(1, -16, 1, 0)
                Title.Font = Enum.Font.Code; Title.Text = name
                Title.TextColor3 = toggled and Colors.Text or Colors.TextDark; Title.TextSize = 10
                Title.TextXAlignment = Enum.TextXAlignment.Left

                local function SetState(state)
                    toggled = state
                    Library.Flags[flagId] = state
                    Fill.BackgroundColor3 = state and Colors.Accent1 or Color3.fromRGB(77, 77, 77)
                    Title.TextColor3 = state and Colors.Text or Colors.TextDark
                    pcall(callback, state)
                end

                ToggleFrame.MouseButton1Click:Connect(function() SetState(not toggled) end)
                Library.Elements[flagId] = SetState
                pcall(callback, toggled)
            end

            function Section:CreateKeybind(flagId, name, defaultSettings, callback)
                local settings = defaultSettings
                local binding = false
                local modes = {"Toggle", "Hold", "Always", "Off"}
                Library.Flags[flagId] = settings

                local KeyFrame = Instance.new("Frame")
                KeyFrame.Parent = ElementContainer; KeyFrame.BackgroundTransparency = 1
                KeyFrame.Size = UDim2.new(1, 0, 0, 16)

                local Title = Instance.new("TextLabel")
                Title.Parent = KeyFrame; Title.BackgroundTransparency = 1
                Title.Size = UDim2.new(1, -60, 1, 0); Title.Font = Enum.Font.Code
                Title.Text = name; Title.TextColor3 = Colors.Text; Title.TextSize = 10
                Title.TextXAlignment = Enum.TextXAlignment.Left

                local KeyBtn = Instance.new("TextButton")
                KeyBtn.Parent = KeyFrame; KeyBtn.BackgroundTransparency = 1
                KeyBtn.Position = UDim2.new(1, -80, 0, 0); KeyBtn.Size = UDim2.new(0, 80, 1, 0)
                KeyBtn.Font = Enum.Font.Code; KeyBtn.TextColor3 = Colors.TextDark; KeyBtn.TextSize = 10
                KeyBtn.TextXAlignment = Enum.TextXAlignment.Right

                local function updateUI()
                    local keyStr = settings.Key == "None" and "-" or (typeof(settings.Key) == "EnumItem" and settings.Key.Name or tostring(settings.Key))
                    KeyBtn.Text = string.format("[%s] %s", keyStr, settings.Mode)
                end

                local function setMode(newMode)
                    settings.Mode = newMode
                    updateUI()
                    if newMode == "Always" then
                        settings.Active = true; pcall(callback, settings)
                    elseif newMode == "Off" then
                        settings.Active = false; pcall(callback, settings)
                    else
                        settings.Active = false; pcall(callback, settings)
                    end
                end

                KeyBtn.MouseButton1Click:Connect(function()
                    binding = true
                    KeyBtn.Text = "[...]"
                end)
                KeyBtn.MouseButton2Click:Connect(function()
                    local idx = table.find(modes, settings.Mode) or 1
                    local newMode = modes[(idx % #modes) + 1]
                    setMode(newMode)
                end)

                local function inputBegan(input, gpe)
                    if binding then
                        if input.UserInputType == Enum.UserInputType.Keyboard then
                            if input.KeyCode == Enum.KeyCode.Escape or input.KeyCode == Enum.KeyCode.Backspace then
                                settings.Key = "None"
                            else
                                settings.Key = input.KeyCode
                            end
                            binding = false; updateUI()
                            pcall(callback, settings)
                        end
                        return
                    end
                    if not gpe and settings.Key ~= "None" and (input.KeyCode == settings.Key or input.UserInputType == settings.Key) then
                        if settings.Mode == "Toggle" then
                            settings.Active = not settings.Active
                            pcall(callback, settings)
                        elseif settings.Mode == "Hold" then
                            settings.Active = true
                            pcall(callback, settings)
                        end
                    end
                end

                local function inputEnded(input, gpe)
                    if not binding and not gpe and settings.Key ~= "None" and (input.KeyCode == settings.Key or input.UserInputType == settings.Key) then
                        if settings.Mode == "Hold" then
                            settings.Active = false
                            pcall(callback, settings)
                        end
                    end
                end

                UserInputService.InputBegan:Connect(inputBegan)
                UserInputService.InputEnded:Connect(inputEnded)

                updateUI()
                if settings.Mode == "Always" then settings.Active = true; pcall(callback, settings) end

                Library.Elements[flagId] = function(val)
                    if type(val) == "table" then
                        settings.Key = val.Key or settings.Key
                        settings.Mode = val.Mode or settings.Mode
                        updateUI()
                        pcall(callback, settings)
                    end
                end
                pcall(callback, settings)
            end

            function Section:CreateSlider(flagId, name, min, max, default, callback, step)
                local value = default or min
                Library.Flags[flagId] = value
                local step = step or 0.01

                local SliderFrame = Instance.new("Frame")
                SliderFrame.Parent = ElementContainer; SliderFrame.BackgroundTransparency = 1
                SliderFrame.Size = UDim2.new(1, 0, 0, 24)

                local Title = Instance.new("TextLabel")
                Title.Parent = SliderFrame; Title.BackgroundTransparency = 1
                Title.Size = UDim2.new(1, 0, 0, 14); Title.Font = Enum.Font.Code
                Title.Text = name; Title.TextColor3 = Colors.Text; Title.TextSize = 10
                Title.TextXAlignment = Enum.TextXAlignment.Left

                local Outline = Instance.new("Frame")
                Outline.Parent = SliderFrame; Outline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                Outline.BorderSizePixel = 0; Outline.Position = UDim2.new(0, 0, 0, 15)
                Outline.Size = UDim2.new(1, 0, 0, 7)

                local BG = Instance.new("Frame")
                BG.Parent = Outline; BG.BackgroundColor3 = Color3.fromRGB(71, 71, 71)
                BG.BorderSizePixel = 0; BG.Position = UDim2.new(0, 1, 0, 1)
                BG.Size = UDim2.new(1, -2, 1, -2)

                local Fill = Instance.new("Frame")
                Fill.Parent = BG; Fill.BackgroundColor3 = Colors.Accent1
                Fill.BorderSizePixel = 0; Fill.Size = UDim2.new(math.clamp((value - min) / (max - min), 0, 1), 0, 1, 0)

                local Gradient = Instance.new("UIGradient", Fill)
                Gradient.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 255)), ColorSequenceKeypoint.new(1, Color3.fromRGB(175, 175, 175))}
                Gradient.Rotation = 90

                local ValueDisplay = Instance.new("TextLabel")
                ValueDisplay.Parent = Fill; ValueDisplay.BackgroundTransparency = 1
                ValueDisplay.Position = UDim2.new(1, 0, 0.5, 1); ValueDisplay.Size = UDim2.new(0, 2, 1, 0)
                ValueDisplay.Font = Enum.Font.Code; ValueDisplay.Text = tostring(value)
                ValueDisplay.TextColor3 = Color3.fromRGB(255, 255, 255); ValueDisplay.TextSize = 10
                ValueDisplay.TextStrokeTransparency = 0.5; ValueDisplay.TextXAlignment = Enum.TextXAlignment.Center

                local Hitbox = Instance.new("TextButton")
                Hitbox.Parent = Outline; Hitbox.BackgroundTransparency = 1
                Hitbox.Size = UDim2.new(1, 0, 1, 0); Hitbox.Text = ""

                local function SetValue(v)
                    value = math.clamp(round(v, step), min, max)
                    Library.Flags[flagId] = value
                    Fill.Size = UDim2.new((value - min) / (max - min), 0, 1, 0)
                    ValueDisplay.Text = tostring(value)
                    pcall(callback, value)
                end

                local function UpdateSlider(input)
                    local percent = math.clamp((input.Position.X - BG.AbsolutePosition.X) / BG.AbsoluteSize.X, 0, 1)
                    local newValue = min + (max - min) * percent
                    SetValue(newValue)
                end

                local dragging = false
                Hitbox.InputBegan:Connect(function(input)
                    if input.UserInputType == Enum.UserInputType.MouseButton1 then
                        if UserInputService:IsKeyDown(Enum.KeyCode.LeftControl) or UserInputService:IsKeyDown(Enum.KeyCode.RightControl) then
                            -- Manual input
                            local inputFrame = Instance.new("Frame")
                            inputFrame.Parent = SliderFrame
                            inputFrame.BackgroundColor3 = Color3.fromRGB(20,20,20)
                            inputFrame.BorderColor3 = Color3.fromRGB(50,50,50)
                            inputFrame.BorderSizePixel = 1
                            inputFrame.Position = UDim2.new(0.5, -50, 0.5, -10)
                            inputFrame.Size = UDim2.new(0, 100, 0, 20)
                            inputFrame.ZIndex = 20

                            local box = Instance.new("TextBox")
                            box.Parent = inputFrame
                            box.BackgroundTransparency = 1
                            box.Size = UDim2.new(1, -10, 1, 0)
                            box.Position = UDim2.new(0, 5, 0, 0)
                            box.Font = Enum.Font.Code
                            box.TextSize = 12
                            box.TextColor3 = Color3.fromRGB(255,255,255)
                            box.Text = tostring(value)
                            box.ZIndex = 21
                            box.FocusLost:Connect(function()
                                local num = tonumber(box.Text)
                                if num then SetValue(num) end
                                inputFrame:Destroy()
                            end)
                            box.Focused:Connect(function() box.Text = "" end)
                            task.wait(0.05)
                            box:CaptureFocus()
                        else
                            dragging = true; UpdateSlider(input)
                        end
                    end
                end)
                UserInputService.InputEnded:Connect(function(input)
                    if input.UserInputType == Enum.UserInputType.MouseButton1 then dragging = false end
                end)
                UserInputService.InputChanged:Connect(function(input)
                    if dragging and input.UserInputType == Enum.UserInputType.MouseMovement then UpdateSlider(input) end
                end)

                Library.Elements[flagId] = SetValue
                pcall(callback, value)
            end

            function Section:CreateDropdown(flagId, name, list, default, callback)
                local currentValue = default or list[1]
                Library.Flags[flagId] = currentValue
                local isOpen = false

                local DropdownFrame = Instance.new("Frame")
                DropdownFrame.Parent = ElementContainer; DropdownFrame.BackgroundTransparency = 1
                DropdownFrame.Size = UDim2.new(1, 0, 0, 36)

                local Title = Instance.new("TextLabel")
                Title.Parent = DropdownFrame; Title.BackgroundTransparency = 1
                Title.Size = UDim2.new(1, 0, 0, 14); Title.Font = Enum.Font.Code
                Title.Text = name; Title.TextColor3 = Colors.Text; Title.TextSize = 10; Title.TextXAlignment = Enum.TextXAlignment.Left

                local Outline = Instance.new("Frame")
                Outline.Parent = DropdownFrame; Outline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                Outline.BorderSizePixel = 0; Outline.Position = UDim2.new(0, 0, 0, 16)
                Outline.Size = UDim2.new(1, 0, 0, 18)

                local MainBtn = Instance.new("TextButton")
                MainBtn.Parent = Outline; MainBtn.BackgroundColor3 = Color3.fromRGB(36, 36, 36)
                MainBtn.BorderSizePixel = 0; MainBtn.Position = UDim2.new(0, 1, 0, 1)
                MainBtn.Size = UDim2.new(1, -2, 1, -2); MainBtn.Font = Enum.Font.Code
                MainBtn.Text = " " .. tostring(currentValue); MainBtn.TextColor3 = Colors.TextDark; MainBtn.TextSize = 10; MainBtn.TextXAlignment = Enum.TextXAlignment.Left
                MainBtn.TextTruncate = Enum.TextTruncate.AtEnd

                local Arrow = Instance.new("TextLabel")
                Arrow.Parent = MainBtn; Arrow.BackgroundTransparency = 1; Arrow.Position = UDim2.new(1, -15, 0, 0)
                Arrow.Size = UDim2.new(0, 15, 1, 0); Arrow.Font = Enum.Font.Code; Arrow.Text = "+"
                Arrow.TextColor3 = Colors.TextDark; Arrow.TextSize = 12

                local DropContainer = Instance.new("ScrollingFrame")
                DropContainer.Parent = DropdownFrame; DropContainer.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
                DropContainer.BorderColor3 = Color3.fromRGB(12, 12, 12); DropContainer.BorderSizePixel = 1
                DropContainer.Position = UDim2.new(0, 0, 0, 35)
                DropContainer.Size = UDim2.new(1, 0, 0, math.min(#list * 18, 90)); DropContainer.Visible = false
                DropContainer.ZIndex = 10; DropContainer.ScrollBarThickness = 2
                DropContainer.CanvasSize = UDim2.new(0, 0, 0, #list * 18)
                Instance.new("UIListLayout", DropContainer)

                local function SetValue(val)
                    currentValue = val
                    Library.Flags[flagId] = val
                    MainBtn.Text = " " .. tostring(val)
                    isOpen = false; DropContainer.Visible = false; Arrow.Text = "+"
                    DropdownFrame.Size = UDim2.new(1, 0, 0, 36)
                    pcall(callback, val)
                end
                
                local DropdownAPI = {}
                function DropdownAPI:Refresh(newList)
                    list = newList
                    for _, child in ipairs(DropContainer:GetChildren()) do
                        if child:IsA("TextButton") then child:Destroy() end
                    end
                    
                    DropContainer.CanvasSize = UDim2.new(0, 0, 0, #list * 18)
                    if isOpen then
                        DropdownFrame.Size = UDim2.new(1, 0, 0, 36 + math.min(#list * 18, 90) + 2)
                        DropContainer.Size = UDim2.new(1, 0, 0, math.min(#list * 18, 90))
                    end

                    for _, v in ipairs(list) do
                        local ItemBtn = Instance.new("TextButton")
                        ItemBtn.Parent = DropContainer; ItemBtn.BackgroundColor3 = Color3.fromRGB(36, 36, 36); ItemBtn.BorderSizePixel = 0
                        ItemBtn.Size = UDim2.new(1, 0, 0, 18); ItemBtn.Font = Enum.Font.Code; ItemBtn.Text = " " .. v
                        ItemBtn.TextColor3 = Colors.TextDark; ItemBtn.TextSize = 10; ItemBtn.TextXAlignment = Enum.TextXAlignment.Left; ItemBtn.ZIndex = 11
                        ItemBtn.MouseEnter:Connect(function() ItemBtn.BackgroundColor3 = Color3.fromRGB(45, 45, 45) end)
                        ItemBtn.MouseLeave:Connect(function() ItemBtn.BackgroundColor3 = Color3.fromRGB(36, 36, 36) end)
                        ItemBtn.MouseButton1Click:Connect(function() SetValue(v) end)
                    end

                    if not table.find(list, currentValue) and #list > 0 then SetValue(list[1]) elseif #list == 0 then SetValue("None") end
                end

                DropdownAPI:Refresh(list)

                MainBtn.MouseButton1Click:Connect(function()
                    isOpen = not isOpen
                    DropContainer.Visible = isOpen
                    Arrow.Text = isOpen and "-" or "+"
                    DropdownFrame.Size = UDim2.new(1, 0, 0, isOpen and (36 + math.min(#list * 18, 90) + 2) or 36)
                end)

                Library.Elements[flagId] = SetValue
                pcall(callback, currentValue)
                return DropdownAPI
            end

            function Section:CreateColorPicker(flagId, name, defaultColor, callback)
                local color = defaultColor or Color3.new(1, 1, 1)
                local alpha = 1
                Library.Flags[flagId] = {R = color.R, G = color.G, B = color.B, A = alpha}
                local isOpen = false

                local CPFrame = Instance.new("Frame")
                CPFrame.Parent = ElementContainer; CPFrame.BackgroundTransparency = 1
                CPFrame.Size = UDim2.new(1, 0, 0, 16)

                local Title = Instance.new("TextLabel")
                Title.Parent = CPFrame; Title.BackgroundTransparency = 1
                Title.Size = UDim2.new(1, -25, 1, 0); Title.Font = Enum.Font.Code
                Title.Text = name; Title.TextColor3 = Colors.Text; Title.TextSize = 10
                Title.TextXAlignment = Enum.TextXAlignment.Left

                local ColorOutline = Instance.new("Frame")
                ColorOutline.Parent = CPFrame; ColorOutline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                ColorOutline.BorderSizePixel = 0; ColorOutline.Position = UDim2.new(1, -20, 0, 3)
                ColorOutline.Size = UDim2.new(0, 16, 0, 10)

                local ColorDisplay = Instance.new("TextButton")
                ColorDisplay.Parent = ColorOutline; ColorDisplay.BackgroundColor3 = color
                ColorDisplay.BorderSizePixel = 0; ColorDisplay.Position = UDim2.new(0, 1, 0, 1)
                ColorDisplay.Size = UDim2.new(1, -2, 1, -2); ColorDisplay.Text = ""

                local PickerContainer = Instance.new("Frame")
                PickerContainer.Parent = CPFrame; PickerContainer.BackgroundColor3 = Color3.fromRGB(36, 36, 36)
                PickerContainer.BorderColor3 = Color3.fromRGB(12, 12, 12); PickerContainer.BorderSizePixel = 1
                PickerContainer.Position = UDim2.new(0, 0, 0, 20); PickerContainer.Size = UDim2.new(1, 0, 0, 150)
                PickerContainer.Visible = false; PickerContainer.ZIndex = 15
                
                local SVMapOutline = Instance.new("Frame")
                SVMapOutline.Parent = PickerContainer; SVMapOutline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                SVMapOutline.BorderSizePixel = 0; SVMapOutline.Position = UDim2.new(0, 5, 0, 5)
                SVMapOutline.Size = UDim2.new(1, -30, 1, -25); SVMapOutline.ZIndex = 15

                local SVMap = Instance.new("TextButton")
                SVMap.Parent = SVMapOutline; SVMap.BackgroundColor3 = Color3.fromHSV(0, 1, 1)
                SVMap.BorderSizePixel = 0; SVMap.Position = UDim2.new(0, 1, 0, 1)
                SVMap.Size = UDim2.new(1, -2, 1, -2); SVMap.Text = ""; SVMap.ZIndex = 15; SVMap.AutoButtonColor = false
                
                local WhiteGrad = Instance.new("UIGradient", Instance.new("Frame", SVMap))
                WhiteGrad.Parent.Size = UDim2.new(1,0,1,0); WhiteGrad.Parent.BackgroundColor3 = Color3.new(1,1,1)
                WhiteGrad.Parent.BorderSizePixel = 0; WhiteGrad.Parent.ZIndex = 16
                WhiteGrad.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.new(1,1,1)), ColorSequenceKeypoint.new(1, Color3.new(1,1,1))}
                WhiteGrad.Transparency = NumberSequence.new{NumberSequenceKeypoint.new(0, 0), NumberSequenceKeypoint.new(1, 1)}
                
                local BlackGrad = Instance.new("UIGradient", Instance.new("Frame", SVMap))
                BlackGrad.Parent.Size = UDim2.new(1,0,1,0); BlackGrad.Parent.BackgroundColor3 = Color3.new(0,0,0)
                BlackGrad.Parent.BorderSizePixel = 0; BlackGrad.Parent.ZIndex = 17
                BlackGrad.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.new(0,0,0)), ColorSequenceKeypoint.new(1, Color3.new(0,0,0))}
                BlackGrad.Transparency = NumberSequence.new{NumberSequenceKeypoint.new(0, 1), NumberSequenceKeypoint.new(1, 0)}
                BlackGrad.Rotation = 90

                local HueOutline = Instance.new("Frame")
                HueOutline.Parent = PickerContainer; HueOutline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                HueOutline.BorderSizePixel = 0; HueOutline.Position = UDim2.new(1, -20, 0, 5)
                HueOutline.Size = UDim2.new(0, 15, 1, -25); HueOutline.ZIndex = 15

                local HueSlider = Instance.new("TextButton")
                HueSlider.Parent = HueOutline; HueSlider.BackgroundColor3 = Color3.new(1,1,1)
                HueSlider.BorderSizePixel = 0; HueSlider.Position = UDim2.new(0, 1, 0, 1)
                HueSlider.Size = UDim2.new(1, -2, 1, -2); HueSlider.Text = ""; HueSlider.ZIndex = 16
                
                local HueGrad = Instance.new("UIGradient", HueSlider)
                HueGrad.Rotation = 90
                HueGrad.Color = ColorSequence.new{
                    ColorSequenceKeypoint.new(0, Color3.fromHSV(0,1,1)), ColorSequenceKeypoint.new(1/6, Color3.fromHSV(1/6,1,1)),
                    ColorSequenceKeypoint.new(2/6, Color3.fromHSV(2/6,1,1)), ColorSequenceKeypoint.new(3/6, Color3.fromHSV(3/6,1,1)),
                    ColorSequenceKeypoint.new(4/6, Color3.fromHSV(4/6,1,1)), ColorSequenceKeypoint.new(5/6, Color3.fromHSV(5/6,1,1)),
                    ColorSequenceKeypoint.new(1, Color3.fromHSV(1,1,1))
                }

                local AlphaOutline = Instance.new("Frame")
                AlphaOutline.Parent = PickerContainer; AlphaOutline.BackgroundColor3 = Color3.fromRGB(12, 12, 12)
                AlphaOutline.BorderSizePixel = 0; AlphaOutline.Position = UDim2.new(0, 5, 1, -15)
                AlphaOutline.Size = UDim2.new(1, -10, 0, 10); AlphaOutline.ZIndex = 15

                local AlphaSlider = Instance.new("TextButton")
                AlphaSlider.Parent = AlphaOutline; AlphaSlider.BackgroundColor3 = Color3.new(1,1,1)
                AlphaSlider.BorderSizePixel = 0; AlphaSlider.Position = UDim2.new(0, 1, 0, 1)
                AlphaSlider.Size = UDim2.new(1, -2, 1, -2); AlphaSlider.Text = ""; AlphaSlider.ZIndex = 16
                
                local AlphaGrad = Instance.new("UIGradient", AlphaSlider)
                AlphaGrad.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.new(0,0,0)), ColorSequenceKeypoint.new(1, Color3.new(1,1,1))}

                local h, s, v = RGBtoHSV(color)
                
                local function UpdateColor()
                    local finalColor = Color3.fromHSV(h/360, s, v)
                    SVMap.BackgroundColor3 = Color3.fromHSV(h/360, 1, 1)
                    ColorDisplay.BackgroundColor3 = finalColor
                    AlphaGrad.Color = ColorSequence.new{ColorSequenceKeypoint.new(0, Color3.new(0,0,0)), ColorSequenceKeypoint.new(1, finalColor)}
                    
                    Library.Flags[flagId] = {R = finalColor.R, G = finalColor.G, B = finalColor.B, A = alpha}
                    pcall(callback, finalColor, alpha)
                end

                local dragSV, dragHue, dragAlpha = false, false, false

                local function getSV(input)
                    s = math.clamp((input.Position.X - SVMap.AbsolutePosition.X) / SVMap.AbsoluteSize.X, 0, 1)
                    v = 1 - math.clamp((input.Position.Y - SVMap.AbsolutePosition.Y) / SVMap.AbsoluteSize.Y, 0, 1)
                    UpdateColor()
                end

                local function getHue(input)
                    h = (math.clamp((input.Position.Y - HueSlider.AbsolutePosition.Y) / HueSlider.AbsoluteSize.Y, 0, 1)) * 360
                    UpdateColor()
                end

                local function getAlpha(input)
                    alpha = math.clamp((input.Position.X - AlphaSlider.AbsolutePosition.X) / AlphaSlider.AbsoluteSize.X, 0, 1)
                    UpdateColor()
                end

                SVMap.InputBegan:Connect(function(input) if input.UserInputType == Enum.UserInputType.MouseButton1 then dragSV = true; getSV(input) end end)
                HueSlider.InputBegan:Connect(function(input) if input.UserInputType == Enum.UserInputType.MouseButton1 then dragHue = true; getHue(input) end end)
                AlphaSlider.InputBegan:Connect(function(input) if input.UserInputType == Enum.UserInputType.MouseButton1 then dragAlpha = true; getAlpha(input) end end)
                
                UserInputService.InputEnded:Connect(function(input)
                    if input.UserInputType == Enum.UserInputType.MouseButton1 then
                        dragSV, dragHue, dragAlpha = false, false, false
                    end
                end)
                
                UserInputService.InputChanged:Connect(function(input)
                    if input.UserInputType == Enum.UserInputType.MouseMovement then
                        if dragSV then getSV(input) end
                        if dragHue then getHue(input) end
                        if dragAlpha then getAlpha(input) end
                    end
                end)

                ColorDisplay.MouseButton1Click:Connect(function()
                    isOpen = not isOpen
                    PickerContainer.Visible = isOpen
                    CPFrame.Size = UDim2.new(1, 0, 0, isOpen and 175 or 16)
                end)
                
                Library.Elements[flagId] = function(val)
                    if type(val) == "table" and val.R then
                        local c = Color3.new(val.R, val.G, val.B)
                        h, s, v = RGBtoHSV(c)
                        alpha = val.A or 1
                        UpdateColor()
                    end
                end

                UpdateColor()
            end

            return Section
        end
        return Tab
    end
    return Window
end

-- =========================================================================
-- RAGEBOT LOGIC (shit)
-- =========================================================================
local VisibilityCache = {}
local lastVisUpdate = 0
local CurrentTarget = nil
local CurrentHitPart = nil

local function GetPredictedPosition(part)
    if not part then return Vector3.new(0,0,0) end
    if ScriptState.Rage_PredictionEnabled then
        local velocity = part.AssemblyLinearVelocity
        if velocity.Magnitude == 0 then velocity = part.Velocity end
        return part.Position + (velocity * ScriptState.Rage_PredictionAmount)
    else
        return part.Position
    end
end

function IsAlive(plr)
    if plr and plr.Character and plr.Character:FindFirstChildOfClass("Humanoid") and plr.Character:FindFirstChildOfClass("Humanoid").Health > 0 then return true end
    return false
end

local function IsTargetDeadOrKO(plr)
    if not plr.Character then return true end
    local hum = plr.Character:FindFirstChildOfClass("Humanoid")
    if not hum then return true end
    if hum.Health <= 0 then return true end
    if hum:GetState() == Enum.HumanoidStateType.Ragdoll or hum:GetState() == Enum.HumanoidStateType.Physics then
        return true
    end
    local ko = plr.Character:GetAttribute("KO")
    if ko == true then return true end
    return false
end

local function GetBodyPoints(model, origin, hitboxScale)
    local points = {}
    local scale = math.clamp(hitboxScale or 0, 0, 100) / 100
    local parts = {
        model:FindFirstChild("Head"),
        model:FindFirstChild("UpperTorso") or model:FindFirstChild("Torso") or model:FindFirstChild("HumanoidRootPart"),
        model:FindFirstChild("LeftUpperArm") or model:FindFirstChild("Left Arm"),
        model:FindFirstChild("RightUpperArm") or model:FindFirstChild("Right Arm"),
        model:FindFirstChild("LeftUpperLeg") or model:FindFirstChild("Left Leg"),
        model:FindFirstChild("RightUpperLeg") or model:FindFirstChild("Right Leg"),
        model:FindFirstChild("HumanoidRootPart")
    }

    for _, part in pairs(parts) do
        if part then
            local center = part.Position
            table.insert(points, center)
            if scale > 0 then
                local size = part.Size
                for i = 1, 4 do
                    local offset = Vector3.new(
                        (math.random() - 0.5) * size.X * scale,
                        (math.random() - 0.5) * size.Y * scale,
                        (math.random() - 0.5) * size.Z * scale
                    )
                    table.insert(points, center + offset)
                end
            end
        end
    end
    return points
end

local function GetRayOrigin()
    local char = LocalPlayer.Character
    if not char then return Camera.CFrame.Position end
    local originType = ScriptState.Rage_RayOrigin
    if originType == "Camera" then
        return Camera.CFrame.Position
    elseif originType == "Character" then
        local root = char:FindFirstChild("HumanoidRootPart")
        return root and root.Position or char:GetPivot().Position
    elseif originType == "Head" then
        local head = char:FindFirstChild("Head")
        return head and head.Position or char:GetPivot().Position
    elseif originType == "RightHand" then
        local rightHand = char:FindFirstChild("RightHand") or char:FindFirstChild("Right Arm")
        return rightHand and rightHand.Position or char:GetPivot().Position
    end
    return Camera.CFrame.Position
end

local function UpdateVisibilityCache()
    local now = tick()
    local interval = 1 / ScriptState.Rage_RaysPerSecond
    if now - lastVisUpdate < interval then return end
    lastVisUpdate = now

    local origin = GetRayOrigin()
    local myChar = LocalPlayer.Character
    if not myChar then return end

    local rayParams = RaycastParams.new()
    rayParams.FilterDescendantsInstances = {myChar}
    rayParams.FilterType = Enum.RaycastFilterType.Exclude
    rayParams.IgnoreWater = true

    for _, plr in pairs(Players:GetPlayers()) do
        if plr == LocalPlayer or not plr.Character then
            VisibilityCache[plr] = nil
            continue
        end

        local char = plr.Character
        if not IsAlive(plr) then
            VisibilityCache[plr] = nil
            continue
        end

        local dist = (char:GetPivot().Position - origin).Magnitude
        local rayCount = ScriptState.Rage_RayCount
        if ScriptState.Rage_AdaptiveRays then
            rayCount = math.max(1, math.floor(ScriptState.Rage_AdaptiveBaseCount + dist * ScriptState.Rage_AdaptiveFactor))
        end

        local points = GetBodyPoints(char, origin, ScriptState.Rage_HitboxScale)
        if #points == 0 then
            VisibilityCache[plr] = {visible = false, timestamp = now, visPoints = 0}
            continue
        end

        local count = math.min(rayCount, #points)
        local visibleCount = 0
        for i = 1, count do
            local targetPos = points[i]
            local direction = targetPos - origin
            if direction.Magnitude <= ScriptState.Rage_RayDistanceLimit then
                local result = Workspace:Raycast(origin, direction, rayParams)
                if not result or result.Instance:IsDescendantOf(char) then
                    visibleCount = visibleCount + 1
                end
            end
        end
        VisibilityCache[plr] = {visible = (visibleCount > 0), timestamp = now, visPoints = visibleCount}
    end
end

local function IsPlayerVisible(plr)
    local entry = VisibilityCache[plr]
    if not entry then return false end
    if tick() - entry.timestamp > (1 / ScriptState.Rage_RaysPerSecond) * 2 then
        return false
    end
    return entry.visible
end

local function GetVisibilityPoints(plr)
    local entry = VisibilityCache[plr]
    return entry and entry.visPoints or 0
end

-- ESP
local SelectionBoxESP = nil
local function UpdateESP(targetModel)
    if not ScriptState.Rage_ESPEnabled then
        if SelectionBoxESP then SelectionBoxESP:Destroy(); SelectionBoxESP = nil end
        return
    end
    if targetModel then
        if not SelectionBoxESP or SelectionBoxESP.Adornee ~= targetModel then
            if SelectionBoxESP then SelectionBoxESP:Destroy() end
            SelectionBoxESP = Instance.new("SelectionBox")
            SelectionBoxESP.LineThickness = ScriptState.Rage_ESPThickness
            SelectionBoxESP.Color3 = ScriptState.Rage_ESPColor
            SelectionBoxESP.Transparency = 0
            SelectionBoxESP.Adornee = targetModel
            SelectionBoxESP.Parent = targetModel
        end
        SelectionBoxESP.LineThickness = ScriptState.Rage_ESPThickness
        SelectionBoxESP.Color3 = ScriptState.Rage_ESPColor
    else
        if SelectionBoxESP then SelectionBoxESP:Destroy(); SelectionBoxESP = nil end
    end
end

-- TV Flag
local TVFlagDrawing = nil
local function UpdateTVFlag(plr, visible)
    if not ScriptState.Rage_TVFlagEnabled or not plr or not plr.Character then
        if TVFlagDrawing then TVFlagDrawing.Visible = false end
        return
    end
    if not TVFlagDrawing then
        if Drawing then
            pcall(function()
                TVFlagDrawing = Drawing.new("Text")
                TVFlagDrawing.Center = true
                TVFlagDrawing.Size = 18
            end)
        end
    end
    if TVFlagDrawing then
        local head = plr.Character:FindFirstChild("Head")
        if head and visible then
            local screenPos, onScreen = Camera:WorldToViewportPoint(head.Position + Vector3.new(0, 1.5, 0))
            if onScreen then
                TVFlagDrawing.Position = Vector2.new(screenPos.X, screenPos.Y)
                TVFlagDrawing.Text = "TV"
                TVFlagDrawing.Color = Color3.fromRGB(0, 255, 0)
                TVFlagDrawing.Visible = true
            else
                TVFlagDrawing.Visible = false
            end
        else
            TVFlagDrawing.Visible = false
        end
    end
end

local function GetCrosshairDistance(character)
    local root = character and character:FindFirstChild("HumanoidRootPart")
    if not root then return math.huge end
    local screenPos, onScreen = Camera:WorldToViewportPoint(root.Position)
    if not onScreen then return math.huge end
    local crosshair = Vector2.new(Camera.ViewportSize.X/2, Camera.ViewportSize.Y/2)
    return (Vector2.new(screenPos.X, screenPos.Y) - crosshair).Magnitude
end

local function GetHealth(plr)
    if IsAlive(plr) then
        return plr.Character:FindFirstChildOfClass("Humanoid").Health
    end
    return 0
end

local function IsWithinFOV(position)
    local fov = ScriptState.Rage_FOV
    if fov <= 0 then return true end
    local camDir = Camera.CFrame.LookVector
    local toTarget = (position - Camera.CFrame.Position).Unit
    local angle = math.deg(math.acos(camDir:Dot(toTarget)))
    return angle <= fov / 2
end

local function GetTargetByMode(playersData)
    local mode = ScriptState.Rage_TargetMode
    local best = nil
    local bestValue = nil

    if mode == "Random" then
        if #playersData > 0 then
            local idx = math.random(1, #playersData)
            return playersData[idx]
        end
        return nil
    end

    for _, data in ipairs(playersData) do
        local val
        if mode == "Nearest" then
            val = data.dist
        elseif mode == "Furthest" then
            val = -data.dist
        elseif mode == "Crosshair" then
            val = data.crossDist
        elseif mode == "BestHitchance" then
            val = -(data.visPoints or 0)
        elseif mode == "LowestHP" then
            val = data.hp or 100
        end
        if not best or val < bestValue then
            best = data
            bestValue = val
        end
    end
    return best
end

local function GetClosestTarget()
    local myRoot = LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
    if not myRoot then return nil, nil end
    local origin = GetRayOrigin()

    local candidates = {}
    for _, plr in pairs(Players:GetPlayers()) do
        if plr ~= LocalPlayer and IsAlive(plr) then
            if ScriptState.Rage_DeadKOCheck and IsTargetDeadOrKO(plr) then continue end
            local isTeammate = (ScriptState.Rage_TeamCheck and plr.Team == LocalPlayer.Team)
            if not isTeammate then
                local targetRoot = plr.Character:FindFirstChild("HumanoidRootPart")
                if targetRoot then
                    local dist = (targetRoot.Position - origin).Magnitude
                    if dist <= ScriptState.Rage_RayDistanceLimit then
                        if not ScriptState.Rage_WallCheck or IsPlayerVisible(plr) then
                            local bestPart = nil
                            local priorityParts = {"Head", "HumanoidRootPart", "Torso", "UpperTorso", "LowerTorso"}
                            for _, partName in ipairs(priorityParts) do
                                bestPart = plr.Character:FindFirstChild(partName)
                                if bestPart then break end
                            end
                            if bestPart and IsWithinFOV(bestPart.Position) then
                                table.insert(candidates, {
                                    plr = plr,
                                    dist = dist,
                                    crossDist = GetCrosshairDistance(plr.Character),
                                    visPoints = GetVisibilityPoints(plr),
                                    hp = GetHealth(plr),
                                    bestPart = bestPart,
                                })
                            end
                        end
                    end
                end
            end
        end
    end

    if #candidates == 0 then return nil, nil end
    local target = GetTargetByMode(candidates)
    if target then return target.plr, target.bestPart end
    return nil, nil
end

-- =========================================================================
-- SILENT AIM HOOKS fucking shit
-- =========================================================================
local hookmetamethod = hookmetamethod or function() end
local newcclosure = newcclosure or function(f) return f end
local checkcaller = checkcaller or function() return false end
local getnamecallmethod = getnamecallmethod or function() return "" end
local mouse1click = mouse1click or function() end

local OldNameCall = nil
OldNameCall = hookmetamethod(game, "__namecall", newcclosure(function(self, ...)
    local Args = {...}
    local Method = getnamecallmethod()
    if ScriptState.Rage_SilentAim and CurrentHitPart and not checkcaller() then
        local Chance = math.random(1, 100) <= ScriptState.Rage_Hitchance
        if Chance then
            local PredictedPos = GetPredictedPosition(CurrentHitPart)
            if Method == "Raycast" and (self == Workspace or self == workspace) then
                if typeof(Args[1]) == "Vector3" and typeof(Args[2]) == "Vector3" then
                    Args[2] = (PredictedPos - Args[1]).Unit * 10000
                    return OldNameCall(self, unpack(Args))
                end
            end
            if (Method == "FindPartOnRay" or Method == "FindPartOnRayWithWhitelist" or Method == "FindPartOnRayWithIgnoreList") and (self == Workspace or self == workspace) then
                if typeof(Args[1]) == "Ray" then
                    Args[1] = Ray.new(Args[1].Origin, (PredictedPos - Args[1].Origin).Unit * 10000)
                    return OldNameCall(self, unpack(Args))
                end
            end
            if (self == Mouse or tostring(self) == "Mouse") then
                if Method == "Hit" then return CFrame.new(PredictedPos)
                elseif Method == "Target" then return CurrentHitPart end
            end
            if Method == "FireServer" and ScriptState.Rage_SilentAimRemote then
                for i, arg in pairs(Args) do
                    if typeof(arg) == "Vector3" then
                        if (arg - Camera.CFrame.Position).Magnitude > 5 then Args[i] = PredictedPos end
                    elseif typeof(arg) == "CFrame" then
                        if (arg.Position - Camera.CFrame.Position).Magnitude > 5 then Args[i] = CFrame.new(PredictedPos) end
                    end
                end
                return OldNameCall(self, unpack(Args))
            end
        end
    end
    return OldNameCall(self, ...)
end))

local OldIndex = nil
OldIndex = hookmetamethod(game, "__index", newcclosure(function(self, Key)
    if not checkcaller() and ScriptState.Rage_SilentAim and CurrentHitPart then
        if (self == Mouse or tostring(self) == "Mouse") then
            if Key == "Hit" then return CFrame.new(GetPredictedPosition(CurrentHitPart))
            elseif Key == "Target" then return CurrentHitPart end
        end
    end
    return OldIndex(self, Key)
end))

-- =========================================================================
-- KEYBINDS HANDLER
-- =========================================================================
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    if input.KeyCode == ScriptState.Keybinds.AutoShoot then
        ScriptState.Rage_AutoShoot = not ScriptState.Rage_AutoShoot
        if Library.Elements["Rage_AutoShoot"] then
            pcall(function() Library.Elements["Rage_AutoShoot"](ScriptState.Rage_AutoShoot) end)
        end
    elseif input.KeyCode == ScriptState.Keybinds.MenuToggle then
        local gui = CoreGui:FindFirstChild("sk8er") or LocalPlayer.PlayerGui:FindFirstChild("sk8er")
        if gui then gui.Enabled = not gui.Enabled end
    end
end)

-- =========================================================================
-- FPS & PING TRACKER deleted:(
-- =========================================================================
local frameCount = 0
local currentFPS = 0
local lastTimeFPS = tick()

-- =========================================================================
-- MAIN LOOPS
-- =========================================================================
local function PerformAutoShootClick()
    pcall(function() mouse1click() end)
    if VirtualInputManager then
        VirtualInputManager:SendMouseButtonEvent(0, 0, 0, true, game, 1)
        VirtualInputManager:SendMouseButtonEvent(0, 0, 0, false, game, 1)
    end
end


local frameCount = 0
local currentFPS = 0
local lastTimeFPS = tick()


RunService.Heartbeat:Connect(function()

    local char = LocalPlayer.Character
    if char then
        local hrp = char:FindFirstChild("HumanoidRootPart")
        local hum = char:FindFirstChild("Humanoid")
        if hrp and hum and hum.Health > 0 then
            local cfs = ScriptState.Movement.CFrameSpeed
            local vs = ScriptState.Movement.VelocitySpeed
            local cff = ScriptState.Movement.CFrameFly
            local vf = ScriptState.Movement.VelocityFly

            if cfs.Active and hum.MoveDirection.Magnitude > 0 then
                hrp.CFrame = hrp.CFrame + (hum.MoveDirection * ScriptState.CFrameSpeedValue * 0.05)
            end
            if vs.Active and hum.MoveDirection.Magnitude > 0 then
                local currentY = hrp.Velocity.Y
                local newVel = hum.MoveDirection * ScriptState.VelocitySpeedValue
                hrp.Velocity = Vector3.new(newVel.X, currentY, newVel.Z)
            end
            if cff.Active then
                local cam = Camera
                local dir = Vector3.new(0,0,0)
                if UserInputService:IsKeyDown(Enum.KeyCode.W) then dir = dir + cam.CFrame.LookVector end
                if UserInputService:IsKeyDown(Enum.KeyCode.S) then dir = dir - cam.CFrame.LookVector end
                if UserInputService:IsKeyDown(Enum.KeyCode.A) then dir = dir - cam.CFrame.RightVector end
                if UserInputService:IsKeyDown(Enum.KeyCode.D) then dir = dir + cam.CFrame.RightVector end
                if UserInputService:IsKeyDown(Enum.KeyCode.Space) then dir = dir + Vector3.new(0,1,0) end
                if UserInputService:IsKeyDown(Enum.KeyCode.LeftShift) then dir = dir - Vector3.new(0,1,0) end
                hrp.Velocity = Vector3.new(0,0,0)
                if dir.Magnitude > 0 then
                    dir = dir.Unit
                    hrp.CFrame = hrp.CFrame + (dir * ScriptState.CFrameFlyValue * 0.05)
                end
            elseif vf.Active then
                local cam = Camera
                local dir = Vector3.new(0,0,0)
                if UserInputService:IsKeyDown(Enum.KeyCode.W) then dir = dir + cam.CFrame.LookVector end
                if UserInputService:IsKeyDown(Enum.KeyCode.S) then dir = dir - cam.CFrame.LookVector end
                if UserInputService:IsKeyDown(Enum.KeyCode.A) then dir = dir - cam.CFrame.RightVector end
                if UserInputService:IsKeyDown(Enum.KeyCode.D) then dir = dir + cam.CFrame.RightVector end
                if UserInputService:IsKeyDown(Enum.KeyCode.Space) then dir = dir + Vector3.new(0,1,0) end
                if UserInputService:IsKeyDown(Enum.KeyCode.LeftShift) then dir = dir - Vector3.new(0,1,0) end
                if dir.Magnitude > 0 then dir = dir.Unit end
                hrp.Velocity = dir * ScriptState.VelocityFlyValue
            end
        end
    end


    if ScriptState.Rage_Enabled then
        UpdateVisibilityCache()
        local target, hitPart = GetClosestTarget()
        CurrentTarget = target
        CurrentHitPart = hitPart
        UpdateESP(CurrentTarget and CurrentTarget.Character)
        UpdateTVFlag(CurrentTarget, CurrentTarget and IsPlayerVisible(CurrentTarget))

        if CurrentTarget and CurrentHitPart then
            local PredictedPos = GetPredictedPosition(CurrentHitPart)
            if ScriptState.Rage_FaceTarget then
                local char = LocalPlayer.Character
                if char and char:FindFirstChild("HumanoidRootPart") then
                    local root = char.HumanoidRootPart
                    root.CFrame = CFrame.new(root.Position, Vector3.new(PredictedPos.X, root.Position.Y, PredictedPos.Z))
                end
            end
            if ScriptState.Rage_AutoShoot then
                PerformAutoShootClick()
            end
        else
            CurrentTarget = nil
            CurrentHitPart = nil
        end
    else
        CurrentTarget = nil
        CurrentHitPart = nil
        UpdateESP(nil)
        UpdateTVFlag(nil, false)
    end
end)


local CrossGui = Instance.new("ScreenGui", CoreGui)
local CrossContainer = Instance.new("Frame", CrossGui)
CrossContainer.BackgroundTransparency = 1; CrossContainer.Size = UDim2.new(0, 100, 0, 100); CrossContainer.AnchorPoint = Vector2.new(0.5, 0.5)
local LineTop, LineBottom, LineLeft, LineRight, CenterDot = nil, nil, nil, nil, nil
local lastCameraLook = Camera.CFrame.LookVector
local currentInertiaOffset = Vector2.new(0, 0)
local currentDynamicGap = 0


local originalMaterials = {}
local originalColors = {}
local originalTransparencies = {}

RunService.RenderStepped:Connect(function(deltaTime)

    frameCount = frameCount + 1
    local nowFPS = tick()
    if nowFPS - lastTimeFPS >= 1 then
        currentFPS = math.floor(frameCount / (nowFPS - lastTimeFPS) + 0.5)
        frameCount = 0
        lastTimeFPS = nowFPS
    end



    local target = CurrentTarget
    local raysVisible = target and GetVisibilityPoints(target) or 0
    UpdateSideIndicators(target, raysVisible)


    if ScriptState.SelfChams then
        local char = LocalPlayer.Character
        if char then
            for _, part in pairs(char:GetDescendants()) do
                if part:IsA("BasePart") and part.Name ~= "HumanoidRootPart" then
                    if not originalMaterials[part] then
                        originalMaterials[part] = part.Material
                        originalColors[part] = part.Color
                        originalTransparencies[part] = part.Transparency
                    end
                    part.Material = Enum.Material.ForceField
                    part.Color = ScriptState.SelfChamsColor
                    part.Transparency = 1 - ScriptState.SelfChamsAlpha
                end
            end
        end
    else
        for part, mat in pairs(originalMaterials) do
            if part and part.Parent then
                part.Material = mat
                part.Color = originalColors[part]
                part.Transparency = originalTransparencies[part] or 0
            end
        end
        table.clear(originalMaterials)
        table.clear(originalColors)
        table.clear(originalTransparencies)
    end


    if ScriptState.EnemyChams then
        for _, player in pairs(Players:GetPlayers()) do
            if player ~= LocalPlayer and player.Character then
                local hl = player.Character:FindFirstChild("EnemyHighlightCham")
                if not hl then
                    hl = Instance.new("Highlight", player.Character)
                    hl.Name = "EnemyHighlightCham"
                    hl.DepthMode = Enum.HighlightDepthMode.AlwaysOnTop
                end
                hl.FillColor = ScriptState.EnemyChamsColor
                hl.OutlineColor = ScriptState.EnemyChamsColor
                hl.FillTransparency = 1 - ScriptState.EnemyChamsAlpha
                hl.OutlineTransparency = 1 - ScriptState.EnemyChamsAlpha
                hl.Enabled = true
            end
        end
    end


    if ScriptState.Crosshair then
        if not LineTop then
            local function createLine()
                local line = Instance.new("Frame", CrossContainer)
                line.BorderSizePixel = 0; line.AnchorPoint = Vector2.new(0.5, 0.5)
                return line
            end
            LineTop, LineBottom, LineLeft, LineRight, CenterDot = createLine(), createLine(), createLine(), createLine(), createLine()
        end
        CrossContainer.Visible = true
        local t, l = ScriptState.CrosshairThickness, ScriptState.CrosshairLength
        local c, a = ScriptState.CrosshairColor, 1 - ScriptState.CrosshairAlpha

        LineTop.Size = UDim2.new(0, t, 0, l); LineBottom.Size = UDim2.new(0, t, 0, l)
        LineLeft.Size = UDim2.new(0, l, 0, t); LineRight.Size = UDim2.new(0, l, 0, t)
        CenterDot.Size = UDim2.new(0, t, 0, t); CenterDot.Visible = ScriptState.CrosshairDot

        for _, line in ipairs({LineTop, LineBottom, LineLeft, LineRight, CenterDot}) do
            line.BackgroundColor3 = c; line.BackgroundTransparency = a
        end

        CrossContainer.Rotation = CrossContainer.Rotation + (ScriptState.CrosshairSpin * 50 * deltaTime)
        local currentLook = Camera.CFrame.LookVector
        local deltaLook = lastCameraLook - currentLook
        local speedMag = deltaLook.Magnitude * 2000
        
        local targetDynamicGap = ScriptState.CrosshairGap + (speedMag * ScriptState.CrosshairGapInertia)
        currentDynamicGap = currentDynamicGap + (targetDynamicGap - currentDynamicGap) * (deltaTime * 15)
        
        local targetSwayOffset = Vector2.new(deltaLook.X * 2000, deltaLook.Y * 2000) * ScriptState.CrosshairSway

        if ScriptState.AlignCrosshair and CurrentTarget and CurrentTarget.Character then
            local part = CurrentTarget.Character:FindFirstChild("Head") or CurrentTarget.Character:FindFirstChild("HumanoidRootPart")
            if part then
                local pos, onScreen = Camera:WorldToViewportPoint(part.Position + (part.AssemblyLinearVelocity * 0.165))
                if onScreen then
                    local viewportSize = Camera.ViewportSize
                    local center = Vector2.new(viewportSize.X / 2, viewportSize.Y / 2)
                    local aimOffset = Vector2.new(pos.X, pos.Y) - center
                    targetSwayOffset = targetSwayOffset + aimOffset
                end
            end
        end
        
        currentInertiaOffset = currentInertiaOffset:Lerp(targetSwayOffset, deltaTime * 10)
        
        CrossContainer.Position = UDim2.new(0.5, currentInertiaOffset.X, 0.5, currentInertiaOffset.Y)
        local g = currentDynamicGap + (l / 2)
        LineTop.Position = UDim2.new(0.5, 0, 0.5, -g); LineBottom.Position = UDim2.new(0.5, 0, 0.5, g)
        LineLeft.Position = UDim2.new(0.5, -g, 0.5, 0); LineRight.Position = UDim2.new(0.5, g, 0.5, 0)
        CenterDot.Position = UDim2.new(0.5, 0, 0.5, 0)
        
        lastCameraLook = currentLook
    else
        if CrossContainer then CrossContainer.Visible = false end
    end

    -- World Effects
    if ScriptState.fovEnabled then Camera.FieldOfView = ScriptState.fovValue end
    if ScriptState.AmbientEnabled then Lighting.Ambient = ScriptState.AmbientColor else Lighting.Ambient = Color3.new(0,0,0) end
    if ScriptState.TimeEnabled then
        local speed = ScriptState.TimeSpeed
        local from = ScriptState.TimeFrom
        local to = ScriptState.TimeTo
        ScriptState.CurrentTime = (ScriptState.CurrentTime + deltaTime * speed * 0.1) % 24
        local t = ScriptState.CurrentTime
        Lighting.ClockTime = (from <= to) and ((t < from or t > to) and from or t) or ((t > to and t < from) and from or t)
    end
    if ScriptState.FogEnabled then
        Lighting.FogColor = ScriptState.FogColor
        Lighting.FogStart = ScriptState.FogStart
        Lighting.FogEnd = ScriptState.FogEnd
    end
    if ScriptState.BloomEnabled then
        local bloom = Lighting:FindFirstChild("sk8er_Bloom")
        if not bloom then bloom = Instance.new("BloomEffect", Lighting); bloom.Name = "sk8er_Bloom" end
        bloom.Intensity = ScriptState.BloomIntensity; bloom.Size = ScriptState.BloomSize; bloom.Threshold = ScriptState.BloomThreshold; bloom.Enabled = true
    else
        local bloom = Lighting:FindFirstChild("sk8er_Bloom")
        if bloom then bloom.Enabled = false end
    end


    if ScriptState.SkyboxEnabled then
        local asset = SkyboxAssets[ScriptState.SelectedSkybox]
        if asset then
            local sky = Lighting:FindFirstChildOfClass("Sky") or Instance.new("Sky")
            sky.Parent = Lighting
            sky.SkyboxBk = asset.Bk; sky.SkyboxDn = asset.Dn; sky.SkyboxFt = asset.Ft
            sky.SkyboxLf = asset.Lf; sky.SkyboxRt = asset.Rt; sky.SkyboxUp = asset.Up
        end
    else
        local sky = Lighting:FindFirstChildOfClass("Sky")
        if sky then sky:Destroy() end
    end
end)

-- =========================================================================
-- UI INITIALIZATION
-- =========================================================================
local UI = Library:CreateWindow("sk8er")

local TabRage = UI:CreateTab("rbxassetid://8547236654")
local TabVisuals = UI:CreateTab("rbxassetid://8547254518")
local TabWorld = UI:CreateTab("rbxassetid://8547256547")
local TabConfig = UI:CreateTab("rbxassetid://8547269749")

-- RAGEBOT SECTION
local RageSec = TabRage:CreateSection("Ragebot", "Left")
RageSec:CreateToggle("Rage_Enabled", "Enable Ragebot", ScriptState.Rage_Enabled, function(val) ScriptState.Rage_Enabled = val end)
RageSec:CreateToggle("Rage_TeamCheck", "Team Check", ScriptState.Rage_TeamCheck, function(val) ScriptState.Rage_TeamCheck = val end)
RageSec:CreateToggle("Rage_WallCheck", "Wall Check", ScriptState.Rage_WallCheck, function(val) ScriptState.Rage_WallCheck = val end)
RageSec:CreateToggle("Rage_AutoShoot", "Auto Shoot", ScriptState.Rage_AutoShoot, function(val) ScriptState.Rage_AutoShoot = val end)
RageSec:CreateKeybind("Key_AutoShoot", "Auto Shoot Key", {Key = ScriptState.Keybinds.AutoShoot, Mode = "Toggle"}, function(settings) ScriptState.Keybinds.AutoShoot = settings.Key end)
RageSec:CreateToggle("Rage_FaceTarget", "Face Target", ScriptState.Rage_FaceTarget, function(val) ScriptState.Rage_FaceTarget = val end)
RageSec:CreateToggle("Rage_SilentAim", "Silent Aim", ScriptState.Rage_SilentAim, function(val) ScriptState.Rage_SilentAim = val end)
RageSec:CreateToggle("Rage_PredictionEnabled", "Prediction Enabled", ScriptState.Rage_PredictionEnabled, function(val) ScriptState.Rage_PredictionEnabled = val end)
RageSec:CreateSlider("Rage_PredictionAmount", "Prediction Amount", 0, 0.5, ScriptState.Rage_PredictionAmount, function(v) ScriptState.Rage_PredictionAmount = round(v,0.01) end, 0.01)

local TargetingSec = TabRage:CreateSection("Targeting", "Right")
TargetingSec:CreateSlider("Rage_RaysPerSecond", "Rays per second", 1, 100, ScriptState.Rage_RaysPerSecond, function(v) ScriptState.Rage_RaysPerSecond = round(v,1) end, 1)
TargetingSec:CreateSlider("Rage_RayCount", "Ray count", 1, 100, ScriptState.Rage_RayCount, function(v) ScriptState.Rage_RayCount = round(v,1) end, 1)
TargetingSec:CreateSlider("Rage_HitboxScale", "Hitbox scale %", 0, 100, ScriptState.Rage_HitboxScale, function(v) ScriptState.Rage_HitboxScale = round(v,1) end, 1)
TargetingSec:CreateToggle("Rage_AdaptiveRays", "Adaptive Rays", ScriptState.Rage_AdaptiveRays, function(v) ScriptState.Rage_AdaptiveRays = v end)
TargetingSec:CreateSlider("Rage_AdaptiveBaseCount", "Adaptive Base Count", 1, 10, ScriptState.Rage_AdaptiveBaseCount, function(v) ScriptState.Rage_AdaptiveBaseCount = round(v,1) end, 1)
TargetingSec:CreateSlider("Rage_AdaptiveFactor", "Adaptive Factor", 0, 0.05, ScriptState.Rage_AdaptiveFactor, function(v) ScriptState.Rage_AdaptiveFactor = round(v,0.01) end, 0.01)
TargetingSec:CreateDropdown("Rage_TargetMode", "Target Mode", {"Nearest", "Furthest", "Crosshair", "BestHitchance", "Random", "LowestHP"}, ScriptState.Rage_TargetMode, function(v) ScriptState.Rage_TargetMode = v end)
TargetingSec:CreateDropdown("Rage_RayOrigin", "Ray Origin", {"Camera", "Character", "Head", "RightHand"}, ScriptState.Rage_RayOrigin, function(v) ScriptState.Rage_RayOrigin = v end)
TargetingSec:CreateSlider("Rage_RayDistanceLimit", "Ray Distance Limit", 100, 10000, ScriptState.Rage_RayDistanceLimit, function(v) ScriptState.Rage_RayDistanceLimit = round(v,1) end, 1)
TargetingSec:CreateToggle("Rage_DeadKOCheck", "Dead/KO Check", ScriptState.Rage_DeadKOCheck, function(v) ScriptState.Rage_DeadKOCheck = v end)
TargetingSec:CreateSlider("Rage_FOV", "FOV (degrees)", 0, 360, ScriptState.Rage_FOV, function(v) ScriptState.Rage_FOV = round(v,1) end, 1)
TargetingSec:CreateSlider("Rage_Hitchance", "Hitchance %", 0, 100, ScriptState.Rage_Hitchance, function(v) ScriptState.Rage_Hitchance = round(v,1) end, 1)

-- MOVEMENT SECTION
local MoveSec = TabRage:CreateSection("Movement", "Right")
MoveSec:CreateKeybind("Move_CFrameSpeed", "CFrame Speed", ScriptState.Movement.CFrameSpeed, function(settings) ScriptState.Movement.CFrameSpeed = settings end)
MoveSec:CreateSlider("CFrameSpeedValue", "Speed Value", 1, 10, ScriptState.CFrameSpeedValue, function(v) ScriptState.CFrameSpeedValue = round(v,0.1) end, 0.1)

MoveSec:CreateKeybind("Move_VelocitySpeed", "Velocity Speed", ScriptState.Movement.VelocitySpeed, function(settings) ScriptState.Movement.VelocitySpeed = settings end)
MoveSec:CreateSlider("VelocitySpeedValue", "Speed Value", 16, 200, ScriptState.VelocitySpeedValue, function(v) ScriptState.VelocitySpeedValue = round(v,1) end, 1)

MoveSec:CreateKeybind("Move_CFrameFly", "CFrame Fly", ScriptState.Movement.CFrameFly, function(settings) ScriptState.Movement.CFrameFly = settings end)
MoveSec:CreateSlider("CFrameFlyValue", "Fly Speed", 1, 20, ScriptState.CFrameFlyValue, function(v) ScriptState.CFrameFlyValue = round(v,0.1) end, 0.1)

MoveSec:CreateKeybind("Move_VelocityFly", "Velocity Fly", ScriptState.Movement.VelocityFly, function(settings) ScriptState.Movement.VelocityFly = settings end)
MoveSec:CreateSlider("VelocityFlyValue", "Fly Speed", 10, 200, ScriptState.VelocityFlyValue, function(v) ScriptState.VelocityFlyValue = round(v,1) end, 1)

-- VISUALS TAB
local VisualESPSec = TabVisuals:CreateSection("Target ESP", "Left")
VisualESPSec:CreateToggle("Rage_ESPEnabled", "Enable Target ESP", ScriptState.Rage_ESPEnabled, function(val) ScriptState.Rage_ESPEnabled = val end)
VisualESPSec:CreateColorPicker("Rage_ESPColor", "ESP Color", ScriptState.Rage_ESPColor, function(c, a) ScriptState.Rage_ESPColor = c end)
VisualESPSec:CreateSlider("Rage_ESPThickness", "ESP Thickness", 0.001, 0.1, ScriptState.Rage_ESPThickness, function(v) ScriptState.Rage_ESPThickness = round(v,0.001) end, 0.001)
VisualESPSec:CreateToggle("Rage_TVFlagEnabled", "Show TV Flag", ScriptState.Rage_TVFlagEnabled, function(v) ScriptState.Rage_TVFlagEnabled = v end)

local ChamsSec = TabVisuals:CreateSection("Chams", "Right")
ChamsSec:CreateToggle("SelfChams_Tog", "Self Chams", ScriptState.SelfChams, function(val) ScriptState.SelfChams = val end)
ChamsSec:CreateColorPicker("SelfChams_Col", "Self Chams Color", ScriptState.SelfChamsColor, function(c, a) ScriptState.SelfChamsColor = c; ScriptState.SelfChamsAlpha = a end)
ChamsSec:CreateToggle("EnemyChams_Tog", "Enemy Chams", ScriptState.EnemyChams, function(val) ScriptState.EnemyChams = val end)
ChamsSec:CreateColorPicker("EnemyChams_Col", "Enemy Chams Color", ScriptState.EnemyChamsColor, function(c, a) ScriptState.EnemyChamsColor = c; ScriptState.EnemyChamsAlpha = a end)

local CrosshairSec = TabVisuals:CreateSection("Custom Crosshair", "Right")
CrosshairSec:CreateToggle("Cross_Tog", "Enable Crosshair", ScriptState.Crosshair, function(val) ScriptState.Crosshair = val end)
CrosshairSec:CreateToggle("Cross_Align", "Align With Target", ScriptState.AlignCrosshair, function(val) ScriptState.AlignCrosshair = val end)
CrosshairSec:CreateColorPicker("Cross_Col", "Crosshair Color", ScriptState.CrosshairColor, function(c, a) ScriptState.CrosshairColor = c; ScriptState.CrosshairAlpha = a end)
CrosshairSec:CreateToggle("Cross_Dot", "Show Center Dot", ScriptState.CrosshairDot, function(val) ScriptState.CrosshairDot = val end)
CrosshairSec:CreateSlider("Cross_Length", "Line Length", 1, 50, ScriptState.CrosshairLength, function(v) ScriptState.CrosshairLength = round(v,1) end, 1)
CrosshairSec:CreateSlider("Cross_Thickness", "Thickness", 1, 10, ScriptState.CrosshairThickness, function(v) ScriptState.CrosshairThickness = round(v,1) end, 1)
CrosshairSec:CreateSlider("Cross_Gap", "Center Gap", 0, 50, ScriptState.CrosshairGap, function(v) ScriptState.CrosshairGap = round(v,1) end, 1)
CrosshairSec:CreateSlider("Cross_GapInertia", "Gap Inertia", 0, 10, ScriptState.CrosshairGapInertia, function(v) ScriptState.CrosshairGapInertia = round(v,0.1) end, 0.1)
CrosshairSec:CreateSlider("Cross_Sway", "Sway", 0, 10, ScriptState.CrosshairSway, function(v) ScriptState.CrosshairSway = round(v,0.1) end, 0.1)
CrosshairSec:CreateSlider("Cross_Spin", "Spin Speed", 0, 50, ScriptState.CrosshairSpin, function(v) ScriptState.CrosshairSpin = round(v,1) end, 1)

-- WORLD TAB
local FOVSec = TabWorld:CreateSection("Camera", "Left")
FOVSec:CreateToggle("FOV_Tog", "Enable FOV Override", ScriptState.fovEnabled, function(val) ScriptState.fovEnabled = val end)
FOVSec:CreateSlider("FOV_Val", "Field of View", 30, 120, ScriptState.fovValue, function(v) ScriptState.fovValue = round(v,1) end, 1)

local AmbientSec = TabWorld:CreateSection("Ambient", "Left")
AmbientSec:CreateToggle("Ambient_Tog", "Enable Ambient", ScriptState.AmbientEnabled, function(v) ScriptState.AmbientEnabled = v end)
AmbientSec:CreateColorPicker("Ambient_Col", "Ambient Color", ScriptState.AmbientColor, function(c) ScriptState.AmbientColor = c end)

local FxSec = TabWorld:CreateSection("World Effects", "Left")
FxSec:CreateToggle("Fog_Tog", "Enable Fog Override", ScriptState.FogEnabled, function(v) ScriptState.FogEnabled = v end)
FxSec:CreateColorPicker("Fog_Col", "Fog Color", ScriptState.FogColor, function(c) ScriptState.FogColor = c end)
FxSec:CreateSlider("Fog_Start", "Fog Start", 0, 1000, ScriptState.FogStart, function(v) ScriptState.FogStart = round(v,1) end, 1)
FxSec:CreateSlider("Fog_End", "Fog End", 0, 5000, ScriptState.FogEnd, function(v) ScriptState.FogEnd = round(v,1) end, 1)

FxSec:CreateToggle("Bloom_Tog", "Enable Bloom", ScriptState.BloomEnabled, function(v) ScriptState.BloomEnabled = v end)
FxSec:CreateSlider("Bloom_Int", "Intensity", 0, 5, ScriptState.BloomIntensity, function(v) ScriptState.BloomIntensity = round(v,0.1) end, 0.1)
FxSec:CreateSlider("Bloom_Size", "Size", 0, 100, ScriptState.BloomSize, function(v) ScriptState.BloomSize = round(v,1) end, 1)
FxSec:CreateSlider("Bloom_Thresh", "Threshold", 0, 10, ScriptState.BloomThreshold, function(v) ScriptState.BloomThreshold = round(v,0.1) end, 0.1)

-- SKYBOX WITH TOGGLE
local SkyboxList = { "Roblox Default", "Sunset", "Arctic", "Space", "Red Night", "Deep Space", "Pink Skies" }
local SkyboxAssets = {
    ["Sunset"] = {Bk="rbxassetid://600830446", Dn="rbxassetid://600831635", Ft="rbxassetid://600832720", Lf="rbxassetid://600886090", Rt="rbxassetid://600833862", Up="rbxassetid://600835177"},
    ["Arctic"] = {Bk="http://www.roblox.com/asset/?id=225469390", Dn="http://www.roblox.com/asset/?id=225469395", Ft="http://www.roblox.com/asset/?id=225469403", Lf="http://www.roblox.com/asset/?id=225469450", Rt="http://www.roblox.com/asset/?id=225469471", Up="http://www.roblox.com/asset/?id=225469481"},
    ["Space"] = {Bk="http://www.roblox.com/asset/?id=166509999", Dn="http://www.roblox.com/asset/?id=166510057", Ft="http://www.roblox.com/asset/?id=166510116", Lf="http://www.roblox.com/asset/?id=166510092", Rt="http://www.roblox.com/asset/?id=166510131", Up="http://www.roblox.com/asset/?id=166510114"},
    ["Roblox Default"] = {Bk="rbxasset://textures/sky/sky512_bk.tex", Dn="rbxasset://textures/sky/sky512_dn.tex", Ft="rbxasset://textures/sky/sky512_ft.tex", Lf="rbxasset://textures/sky/sky512_lf.tex", Rt="rbxasset://textures/sky/sky512_rt.tex", Up="rbxasset://textures/sky/sky512_up.tex"},
    ["Red Night"] = {Bk="http://www.roblox.com/Asset/?ID=401664839", Dn="http://www.roblox.com/Asset/?ID=401664862", Ft="http://www.roblox.com/Asset/?ID=401664960", Lf="http://www.roblox.com/Asset/?ID=401664881", Rt="http://www.roblox.com/Asset/?ID=401664901", Up="http://www.roblox.com/Asset/?ID=401664936"},
    ["Deep Space"] = {Bk="http://www.roblox.com/asset/?id=149397692", Dn="http://www.roblox.com/asset/?id=149397686", Ft="http://www.roblox.com/asset/?id=149397697", Lf="http://www.roblox.com/asset/?id=149397684", Rt="http://www.roblox.com/asset/?id=149397688", Up="http://www.roblox.com/asset/?id=149397702"},
    ["Pink Skies"] = {Bk="http://www.roblox.com/asset/?id=151165214", Dn="http://www.roblox.com/asset/?id=151165197", Ft="http://www.roblox.com/asset/?id=151165224", Lf="http://www.roblox.com/asset/?id=151165191", Rt="http://www.roblox.com/asset/?id=151165206", Up="http://www.roblox.com/asset/?id=151165227"}
}

local SkySec = TabWorld:CreateSection("Skybox", "Right")
SkySec:CreateToggle("Sky_Enabled", "Enable Skybox", ScriptState.SkyboxEnabled, function(val) ScriptState.SkyboxEnabled = val end)
SkySec:CreateDropdown("Skybox_Sel", "Select Skybox", SkyboxList, ScriptState.SelectedSkybox, function(v)
    ScriptState.SelectedSkybox = v
    if ScriptState.SkyboxEnabled then
        local asset = SkyboxAssets[v]
        if asset then
            local sky = Lighting:FindFirstChildOfClass("Sky") or Instance.new("Sky")
            sky.Parent = Lighting
            sky.SkyboxBk = asset.Bk; sky.SkyboxDn = asset.Dn; sky.SkyboxFt = asset.Ft
            sky.SkyboxLf = asset.Lf; sky.SkyboxRt = asset.Rt; sky.SkyboxUp = asset.Up
        end
    end
end)

local TimeSec = TabWorld:CreateSection("Time", "Right")
TimeSec:CreateToggle("Time_Tog", "Enable Time Control", ScriptState.TimeEnabled, function(v) ScriptState.TimeEnabled = v end)
TimeSec:CreateSlider("Time_Speed", "Speed", 0, 50, ScriptState.TimeSpeed, function(v) ScriptState.TimeSpeed = round(v,0.1) end, 0.1)
TimeSec:CreateSlider("Time_From", "From (hour)", 0, 23.5, ScriptState.TimeFrom, function(v) ScriptState.TimeFrom = round(v,0.1) end, 0.1)
TimeSec:CreateSlider("Time_To", "To (hour)", 0, 23.5, ScriptState.TimeTo, function(v) ScriptState.TimeTo = round(v,0.1) end, 0.1)

-- CONFIG TAB
local ConfigSec = TabConfig:CreateSection("Config Manager", "Left")
local cfgName = ""
ConfigSec:CreateInput("Cfg_Name", "Config Name", "Type name here...", function(val) cfgName = val end)

local selectedCfg = "Default"
local cfgDropdown = ConfigSec:CreateDropdown("Cfg_Sel", "Select Config", GetConfigs(), "Default", function(val) selectedCfg = val end)

ConfigSec:CreateButton("Load Selected", function()
    if selectedCfg and selectedCfg ~= "None" then
        local path = "sk8er_configs/"..selectedCfg..".json"
        if isfile and readfile and isfile(path) then
            local data = readfile(path)
            local success, decoded = pcall(function() return HttpService:JSONDecode(data) end)
            if success and type(decoded) == "table" then
                for k, v in pairs(decoded) do
                    if Library.Elements[k] then pcall(function() Library.Elements[k](v) end) end
                end
            end
        end
    end
end)

ConfigSec:CreateButton("Save New (from Input)", function()
    if cfgName and cfgName ~= "" then
        if writefile then
            local data = HttpService:JSONEncode(Library.Flags)
            writefile("sk8er_configs/"..cfgName..".json", data)
            cfgDropdown:Refresh(GetConfigs())
        end
    end
end)

ConfigSec:CreateButton("Overwrite Selected", function()
    if selectedCfg and selectedCfg ~= "None" then
        if writefile then
            local data = HttpService:JSONEncode(Library.Flags)
            writefile("sk8er_configs/"..selectedCfg..".json", data)
        end
    end
end)

ConfigSec:CreateButton("Delete Selected", function()
    if selectedCfg and selectedCfg ~= "None" then
        local path = "sk8er_configs/"..selectedCfg..".json"
        if isfile and delfile and isfile(path) then
            delfile(path)
            cfgDropdown:Refresh(GetConfigs())
        end
    end
end)

local MiscConfigSec = TabConfig:CreateSection("Misc", "Right")
MiscConfigSec:CreateToggle("WM_Tog", "Enable Watermark", ScriptState.WatermarkEnabled, function(val)
    ScriptState.WatermarkEnabled = val
    if wmFrame then wmFrame.Visible = val end
    if sidePanel then sidePanel.Visible = val end
end)

MiscConfigSec:CreateButton("Unload UI", function()
    local gui = CoreGui:FindFirstChild("sk8er") or LocalPlayer:WaitForChild("PlayerGui"):FindFirstChild("sk8er")
    if gui then gui:Destroy() end
    if CrossGui then CrossGui:Destroy() end
    if WatermarkGui then WatermarkGui:Destroy() end
    if SideIndGui then SideIndGui:Destroy() end
    if SelectionBoxESP then SelectionBoxESP:Destroy() end
    if TVFlagDrawing then TVFlagDrawing:Remove() end
    ScriptState.Rage_Enabled = false
    ScriptState.SelfChams = false; ScriptState.EnemyChams = false
    ScriptState.Crosshair = false
    ScriptState.fovEnabled = false
    ScriptState.AmbientEnabled = false
    ScriptState.TimeEnabled = false
    ScriptState.FogEnabled = false
    ScriptState.BloomEnabled = false
    ScriptState.SkyboxEnabled = false
    for k, v in pairs(ScriptState.Movement) do
        if type(v) == "table" then v.Active = false end
    end
    
    for part, mat in pairs(originalMaterials) do
        if part and part.Parent then
            part.Material = mat
            part.Color = originalColors[part]
            part.Transparency = originalTransparencies[part] or 0
        end
    end
    table.clear(originalMaterials)
    table.clear(originalColors)
    table.clear(originalTransparencies)
end)
-- i know its shit but i wanna know where i made mistakes
