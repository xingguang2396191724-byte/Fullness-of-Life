// 多语言支持
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = {
        currentLang: localStorage.getItem('language') || 'en',
        
        translations: {
            zh: {
                // 导航
                'nav.home': '首页',
                'nav.services': '核心业务',
                'nav.about': '关于我们',
                'nav.contact': '联系我们',
                
                // 首页横幅
                'hero.title': '工程承包商与基建运营商的战略合作伙伴',
                'hero.subtitle': '我们通过高端工业设备，为您的供应链提供可靠性与合规性保障',
                'hero.whatsapp': 'WhatsApp咨询',
                'hero.learnMore': '核心解决方案',
                
                // 服务
                'services.title': '专业解决方案',
                'services.subtitle': '为全球项目提供以解决方案为导向的精英级工业设备',
                'services.service1.title': '工业维护系统',
                'services.service1.desc': '大吸力真空系统、HEPA过滤及驾驶式扫地机，支持各类基建项目',
                'services.service2.title': '食品保鲜技术',
                'services.service2.desc': '真空包装、气调包装（MAP）及贴体包装技术，助力农产品增值策略',
                'services.service3.title': '合规与供应链',
                'services.service3.desc': '创始人法学背景提供专业合规审查，为您的贸易安全保驾护航',
                'services.service4.title': '物流与支持',
                'services.service4.desc': 'OEM/ODM集成与零配件持续供应，确保设备长期稳定运行',
                
                // 关于我们
                'about.title': '关于人生小满',
                'about.desc': '总部位于上海浦东，我们不仅是贸易商，更是工程与基建领域的战略技术合作伙伴',
                'about.feature1': '法律合规背景',
                'about.feature2': '工况环境分析',
                'about.feature3': '直连研发中心',
                'about.feature4': '全球合作伙伴',
                
                // 联系我们
                'contact.title': '联系我们',
                'contact.subtitle': '随时为您的基建与包装项目提供专业咨询',
                'contact.phone.title': '联系电话',
                'contact.email.title': '电子邮箱',
                'contact.address.title': '办公地址',
                'contact.address.desc': '中国（上海）自由贸易试验区张杨路707号二层西区205室',
                'contact.hours.title': '服务时间',
                'contact.hours.desc': '周一至周日: 8:00 - 20:00 (北京时间)',
                
                // 联系表单
                'contact.form.title': '在线询盘',
                'contact.form.name': '您的姓名',
                'contact.form.phone': '联系电话',
                'contact.form.email': '电子邮箱',
                'contact.form.serviceDefault': '选择方案类型',
                'contact.form.service1': '工业维护',
                'contact.form.service2': '食品保鲜',
                'contact.form.service3': '合规与供应链',
                'contact.form.service4': '物流与支持',
                'contact.form.message': '项目需求描述',
                'contact.form.submit': '发送询盘',
                
                // 页脚
                'footer.company': '人生小满',
                'footer.tagline': '在全球范围内提供可靠性与法律合规保障',
                'footer.quickLinks': '快速链接',
                'footer.followUs': '关注我们',
                'footer.copyright': '© 2026 人生小满（上海）国际贸易有限公司. 保留所有权利.'
            },
            
            en: {
                // 导航
                'nav.home': 'Home',
                'nav.services': 'Sectors',
                'nav.about': 'About Us',
                'nav.contact': 'Contact',
                
                // 首页横幅
                'hero.title': 'Strategic Partner for Engineering Contractors & Infrastructure Operators',
                'hero.subtitle': 'We engineer reliability and legal certainty into your supply chain with high-end industrial equipment.',
                'hero.whatsapp': 'WhatsApp Us',
                'hero.learnMore': 'Our Solutions',
                
                // 服务
                'services.title': 'Our Specialized Solutions',
                'services.subtitle': 'Providing elite, solution-oriented industrial equipment for your global projects.',
                'services.service1.title': 'Industrial Maintenance Systems',
                'services.service1.desc': 'High-suction vacuum systems, HEPA filtration, and ride-on scrubbers for infrastructure projects.',
                'services.service2.title': 'Food Preservation Technology',
                'services.service2.desc': 'Vacuum packaging, MAP, and skin packaging technology for post-harvest value-add strategies.',
                'services.service3.title': 'Compliance & Supply Chain',
                'services.service3.desc': 'Navigating complex regulations with professional legal oversight and technical pre-consultancy.',
                'services.service4.title': 'Logistics & Support',
                'services.service4.desc': 'OEM/ODM integration and spare parts continuity ensuring long-term operational uptime.',
                
                // 关于我们
                'about.title': 'About Fullness of Life',
                'about.desc': 'Based in Pudong, Shanghai, we operate as a Strategic Technical Partner, engineering reliability and legal certainty into your supply chain.',
                'about.feature1': 'Legal Background',
                'about.feature2': 'Environment Analysis',
                'about.feature3': 'Direct R&D Access',
                'about.feature4': 'Global Partnership',
                
                // 联系我们
                'contact.title': 'Contact Us',
                'contact.subtitle': 'Ready to support your infrastructure and packaging projects worldwide.',
                'contact.phone.title': 'Contact Number',
                'contact.email.title': 'Email',
                'contact.address.title': 'Office Address',
                'contact.address.desc': 'Room 205, West Area, 2nd Floor, No. 707 Zhangyang Road, Pudong, Shanghai, China',
                'contact.hours.title': 'Service Hours',
                'contact.hours.desc': 'Mon - Sun: 8:00 - 20:00 (CST)',
                
                // 联系表单
                'contact.form.title': 'Online Inquiry',
                'contact.form.name': 'Your Name',
                'contact.form.phone': 'Phone Number',
                'contact.form.email': 'Email Address',
                'contact.form.serviceDefault': 'Select Solution Type',
                'contact.form.service1': 'Industrial Maintenance',
                'contact.form.service2': 'Food Preservation',
                'contact.form.service3': 'Compliance & Supply Chain',
                'contact.form.service4': 'Logistics & Support',
                'contact.form.message': 'Tell us about your project',
                'contact.form.submit': 'Send Inquiry',
                
                // 页脚
                'footer.company': 'Fullness of Life',
                'footer.tagline': 'Engineering reliability and legal certainty globally.',
                'footer.quickLinks': 'Quick Links',
                'footer.followUs': 'Follow Us',
                'footer.copyright': '© 2026 Fullness of Life (Shanghai) International Trade Co., Ltd. All rights reserved.'
            }
        },
        
        init: function() {
            this.setupLanguageButtons();
            this.loadLanguage();
        },
        
        setupLanguageButtons: function() {
            const zhBtn = document.getElementById('langZh');
            const enBtn = document.getElementById('langEn');
            
            zhBtn.addEventListener('click', () => {
                this.switchLanguage('zh');
                this.updateButtonState('zh');
            });
            
            enBtn.addEventListener('click', () => {
                this.switchLanguage('en');
                this.updateButtonState('en');
            });
        },
        
        switchLanguage: function(lang) {
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            this.applyTranslations();
        },
        
        loadLanguage: function() {
            this.applyTranslations();
            this.updateButtonState(this.currentLang);
        },
        
        applyTranslations: function() {
            const langData = this.translations[this.currentLang];
            
            // 更新文本内容
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (langData[key]) {
                    element.textContent = langData[key];
                }
            });
            
            // 更新占位符
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                if (langData[key]) {
                    element.setAttribute('placeholder', langData[key]);
                }
            });
            
            // 更新选择框的默认选项
            const select = document.querySelector('select');
            if (select) {
                const defaultOption = select.querySelector('option[disabled][selected]');
                if (defaultOption && langData['contact.form.serviceDefault']) {
                    defaultOption.textContent = langData['contact.form.serviceDefault'];
                }
            }
            
            // 更新页面标题
            document.title = this.currentLang === 'zh' 
                ? '人生小满（上海）国际贸易有限公司 - 工业解决方案'
                : 'Fullness of Life (Shanghai) International Trade Co., Ltd. - Industrial Solutions';
        },
        
        updateButtonState: function(lang) {
            const zhBtn = document.getElementById('langZh');
            const enBtn = document.getElementById('langEn');
            
            zhBtn.classList.toggle('active', lang === 'zh');
            enBtn.classList.toggle('active', lang === 'en');
        }
    };
    
    languageSwitcher.init();
});
