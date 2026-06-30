// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 汉堡菜单点击事件
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是移动端，点击后关闭菜单
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // 移除所有激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前激活状态
            this.classList.add('active');
            
            // 平滑滚动
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 预约表单提交
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取当前语言
            const currentLang = localStorage.getItem('language') || 'zh';
            
            // 获取表单数据
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // 创建多语言提示消息
            const messages = {
                zh: {
                    title: '感谢您的预约！',
                    message: '我们将尽快联系您。\n\n预约信息：\n' +
                           `姓名：${formValues[0] || ''}\n` +
                           `电话：${formValues[1] || ''}\n` +
                           `服务类型：${formValues[3] || ''}`,
                    serviceTypes: {
                        'home': '家庭清洁',
                        'office': '办公清洁',
                        'carpet': '地毯清洗',
                        'glass': '玻璃清洁'
                    }
                },
                en: {
                    title: 'Thank you for your booking!',
                    message: 'We will contact you as soon as possible.\n\nBooking Information:\n' +
                           `Name: ${formValues[0] || ''}\n` +
                           `Phone: ${formValues[1] || ''}\n` +
                           `Service Type: ${formValues[3] || ''}`,
                    serviceTypes: {
                        'home': 'Home Cleaning',
                        'office': 'Office Cleaning',
                        'carpet': 'Carpet Cleaning',
                        'glass': 'Glass Cleaning'
                    }
                }
            };
            
            const langMessages = messages[currentLang];
            let serviceType = formValues[3];
            
            // 翻译服务类型
            if (serviceType && langMessages.serviceTypes[serviceType]) {
                serviceType = langMessages.serviceTypes[serviceType];
            }
            
            alert(langMessages.title + '\n\n' + langMessages.message.replace('${formValues[3] || \'\'}', serviceType));
            
            // 清空表单
            this.reset();
            
            // 重置选择框
            const select = this.querySelector('select');
            if (select) {
                select.selectedIndex = 0;
            }
        });
    }
    
    // 滚动时更新导航栏激活状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // 添加滚动阴影效果
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // 页面加载时的初始化
    window.dispatchEvent(new Event('scroll'));
});