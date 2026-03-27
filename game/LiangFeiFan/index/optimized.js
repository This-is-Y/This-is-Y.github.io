    $(function () {
        let isRunning = false; // 标志变量，表示是否正在运行
        const heading = $("h1");
        let timer;
    
        // 初始化页面，显示当前时间段的建议
        function getMealSuggestion() {
            const now = new Date();
            const hour = now.getHours();
    
            if (hour >= 5 && hour < 12) {
                return "早上吃什么？";
            } else if (hour >= 12 && hour < 17) {
                return "中午吃什么？";
            } else if (hour >= 17 && hour < 22) {
                return "晚上吃什么？";
            } else {
                return "夜宵吃什么？";
            }
        }
    
        // 设置页面加载时的默认提示
        window.onload = function () {
            document.getElementById("suggestion").innerText = getMealSuggestion();
        };
    
        // 开始随机选择食物
        function startRandomSelection() {
            const list = $("#list").val().trim().split(/\s+/); // 获取并清理输入的食物列表
            $("#start").val("停止");
            heading.html(heading.html().replace("吃这个！", "吃什么？"));
    
            timer = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * list.length); // 随机选择食物
                const food = list[randomIndex];
                $("#what").html(food);
    
                // 动态生成随机位置和样式的食物名称
                const randomTop = Math.random() * $(document).height();
                const randomLeft = Math.random() * ($(document).width() - 50);
                const randomSize = Math.random() * (37 - 14) + 14;
    
                $("<span class='temp'></span>")
                    .html(food)
                    .hide()
                    .css({
                        top: randomTop,
                        left: randomLeft,
                        color: `rgba(0,0,0,${Math.random()})`,
                        fontSize: `${randomSize}px`,
                    })
                    .appendTo("body")
                    .fadeIn("slow", function () {
                        $(this).fadeOut("slow", function () {
                            $(this).remove();
                        });
                    });
            }, 50);
    
            isRunning = true;
        }
    
        // 停止随机选择食物
        function stopRandomSelection() {
            $("#start").val("不行，换一个");
            heading.html(heading.html().replace("吃什么？", "吃这个！"));
            clearInterval(timer);
            isRunning = false;
        }
    
                // 随机数生成函数
        function randomNum(minNum, maxNum) {
            if (arguments.length === 1) {
                return Math.floor(Math.random() * minNum + 1);
            } else if (arguments.length === 2) {
                return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
            } else {
                return 0;
            }
        }
        
        // 提示语数组
        const outstr = [
            "这么作？今天别吃了！",
            "吔屎啦,梁非凡！",
            "喝西北风吧，老子不干了"
        ];
        
        let clickCount = 0; // 点击次数计数器
        
        // 点击“开始”按钮的事件处理
        $('#start').click(function () {
            clickCount++;
            if (clickCount >= 6) {
                $('#start').hide();
                $('#stop').show();
            }
        });
        
        // 点击“停止”按钮的事件处理
        $('#stop').click(function () {
            alert(outstr[randomNum(0, outstr.length - 1)]);
            $(this).hide();
            $('#start').show(); // 重置按钮状态
            clickCount = 0; // 重置点击计数
        });
        
      

        // 点击“开始”按钮的事件处理
        $("#start").click(function () {
            if (!isRunning) {
                startRandomSelection();
            } else {
                stopRandomSelection();
            }
        });
    
        // 按下回车键触发“开始”按钮点击事件
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                $("#start").trigger("click");
            }
        });
    });