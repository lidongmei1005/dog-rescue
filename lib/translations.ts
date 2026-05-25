export type Lang = 'en' | 'zh';

export const t = {
  // Navbar
  nav_adopt: { en: 'Adopt a Dog', zh: '领养狗狗' },
  nav_resources: { en: 'Resources', zh: '资源' },
  nav_donate: { en: 'Donate', zh: '捐款' },
  nav_about: { en: 'About Us', zh: '关于我们' },
  nav_adopt_now: { en: 'Adopt Now 🐶', zh: '立即领养 🐶' },

  // Footer
  footer_tagline: { en: "Every dog deserves a loving home. We're dedicated to rescuing, rehabilitating, and rehoming dogs in need.", zh: '每只狗都值得拥有一个充满爱的家。我们致力于救助、康复和为需要帮助的狗狗寻找新家。' },
  footer_links: { en: 'Quick Links', zh: '快速链接' },
  footer_contact: { en: 'Contact', zh: '联系我们' },
  footer_staff: { en: 'Staff Login', zh: '员工登录' },
  footer_copy: { en: 'Made with ❤️ for dogs everywhere.', zh: '用 ❤️ 为每一只狗狗而制作。' },

  // Home
  home_hero_title: { en: 'Every Dog Deserves a Loving Home', zh: '给它一扇门，它还你一颗心' },
  home_hero_sub: { en: 'We rescue, rehabilitate, and rehome dogs in need. Your perfect companion is waiting for you.', zh: '我们救助、康复并为需要帮助的狗狗寻找新家。您的完美伴侣正在等待您。' },
  home_hero_btn1: { en: 'Meet Our Dogs 🐶', zh: '认识我们的狗狗 🐶' },
  home_hero_btn2: { en: 'Support Us ❤️', zh: '支持我们 ❤️' },
  home_stat1: { en: 'Dogs Rescued', zh: '获救狗狗' },
  home_stat2: { en: 'Happy Adoptions', zh: '成功领养' },
  home_stat3: { en: 'Years of Love', zh: '爱心年数' },
  home_featured_title: { en: 'Dogs Looking for Homes', zh: '寻找家庭的狗狗' },
  home_featured_sub: { en: 'These sweet souls are waiting to meet you', zh: '这些可爱的小家伙们在等待与您相遇' },
  home_see_all: { en: 'See All Available Dogs →', zh: '查看所有可领养的狗狗 →' },
  home_how_title: { en: 'How Adoption Works', zh: '如何领养' },
  home_step1_title: { en: 'Browse Dogs', zh: '浏览狗狗' },
  home_step1_desc: { en: 'Explore our gallery of dogs looking for their forever homes', zh: '浏览我们寻找永久家庭的狗狗图册' },
  home_step2_title: { en: 'Apply', zh: '提交申请' },
  home_step2_desc: { en: 'Submit an adoption application — it takes just a few minutes', zh: '提交领养申请，只需几分钟' },
  home_step3_title: { en: 'Welcome Home!', zh: '欢迎回家！' },
  home_step3_desc: { en: "We'll review your application and set up a meet-and-greet", zh: '我们将审核您的申请并安排见面会' },
  home_cta_title: { en: "Can't Adopt? You Can Still Help!", zh: '无法领养？您仍然可以帮助我们！' },
  home_cta_sub: { en: 'Donate, volunteer, or foster — every little bit helps us save more lives.', zh: '捐款、志愿服务或寄养——每一点帮助都能让我们拯救更多生命。' },
  home_cta_btn1: { en: 'Make a Donation', zh: '捐款' },
  home_cta_btn2: { en: 'Volunteer', zh: '志愿服务' },

  // Dogs page
  dogs_title: { en: 'Our Dogs', zh: '我们的狗狗' },
  dogs_sub: { en: 'Find your perfect furry companion', zh: '寻找您完美的毛茸茸伴侣' },
  dogs_all: { en: 'All Dogs', zh: '全部' },
  dogs_none: { en: 'No dogs found.', zh: '没有找到狗狗。' },
  status_available: { en: 'Available', zh: '可领养' },
  status_pending: { en: 'Pending', zh: '审核中' },
  status_adopted: { en: 'Adopted', zh: '已领养' },

  // Dog card
  card_meet: { en: 'Meet', zh: '认识' },
  card_pending: { en: 'Application Pending', zh: '申请审核中' },
  card_adopted: { en: 'Adopted 🎉', zh: '已领养 🎉' },

  // Dog profile
  dog_age: { en: 'Age', zh: '年龄' },
  dog_gender: { en: 'Gender', zh: '性别' },
  dog_size: { en: 'Size', zh: '体型' },
  dog_male: { en: 'Male', zh: '雄性' },
  dog_female: { en: 'Female', zh: '雌性' },
  dog_about: { en: 'About', zh: '关于' },
  dog_kids: { en: 'Kids', zh: '儿童' },
  dog_dogs: { en: 'Dogs', zh: '其他狗' },
  dog_cats: { en: 'Cats', zh: '猫咪' },
  dog_apply_title: { en: 'Apply to Adopt', zh: '申请领养' },

  // Adoption form
  form_name: { en: 'Your Name', zh: '您的姓名' },
  form_email: { en: 'Email', zh: '电子邮箱' },
  form_phone: { en: 'Phone', zh: '电话' },
  form_home_type: { en: 'Home Type', zh: '住宅类型' },
  form_home_house_yard: { en: 'House with yard', zh: '有院子的房子' },
  form_home_house: { en: 'House without yard', zh: '没有院子的房子' },
  form_home_apt: { en: 'Apartment', zh: '公寓' },
  form_home_condo: { en: 'Condo', zh: '共管公寓' },
  form_why: { en: 'Why do you want to adopt?', zh: '您为什么想要领养？' },
  form_why_placeholder: { en: 'Tell us about yourself and why you\'d be a great fit...', zh: '请介绍一下您自己以及为什么您是合适的领养人...' },
  form_experience: { en: 'Pet Experience', zh: '养宠经验' },
  form_experience_placeholder: { en: 'Any previous experience with dogs or other pets?', zh: '您有养狗或其他宠物的经验吗？' },
  form_other_pets: { en: 'Other Pets at Home', zh: '家中其他宠物' },
  form_other_pets_placeholder: { en: 'e.g. 1 cat, 1 dog, none', zh: '例如：1只猫，1只狗，无' },
  form_submit: { en: 'Submit Application 🐾', zh: '提交申请 🐾' },
  form_submitting: { en: 'Submitting...', zh: '提交中...' },
  form_success_title: { en: 'Application Submitted!', zh: '申请已提交！' },
  form_success_msg: { en: "Thank you for your interest in adopting! We'll review your application and be in touch soon.", zh: '感谢您的领养意愿！我们将审核您的申请并尽快与您联系。' },

  // Donate page
  donate_hero_title: { en: 'Support Our Mission', zh: '支持我们的使命' },
  donate_hero_sub: { en: 'Every donation helps us rescue more dogs, provide medical care, and find forever homes.', zh: '每一笔捐款都帮助我们救助更多狗狗，提供医疗护理，并为它们寻找永久的家。' },
  donate_title: { en: 'Make a Donation', zh: '捐款' },
  donate_popular: { en: 'Most Popular', zh: '最受欢迎' },
  donate_btn: { en: 'Donate', zh: '捐款' },
  donate_custom: { en: 'Want to choose your own amount? Reach out to us directly.', zh: '想要自定义捐款金额？请直接联系我们。' },
  volunteer_title: { en: 'Volunteer With Us', zh: '加入我们的志愿团队' },
  volunteer_sub: { en: "Can't donate? Your time is just as valuable. Help walk dogs, assist at events, or foster!", zh: '无法捐款？您的时间同样宝贵。帮助遛狗、协助活动或寄养！' },
  volunteer_name: { en: 'Name', zh: '姓名' },
  volunteer_interests: { en: 'How would you like to help?', zh: '您想如何帮助我们？' },
  volunteer_interests_placeholder: { en: 'e.g., dog walking, fostering, events, social media...', zh: '例如：遛狗、寄养、活动、社交媒体...' },
  volunteer_availability: { en: 'Availability', zh: '可用时间' },
  volunteer_availability_placeholder: { en: 'e.g., weekends, weekday mornings...', zh: '例如：周末、工作日上午...' },
  volunteer_btn: { en: 'Sign Up to Volunteer 🐾', zh: '报名志愿服务 🐾' },
  volunteer_success_title: { en: 'Thank you for signing up!', zh: '感谢您的报名！' },
  volunteer_success_msg: { en: "We'll reach out with next steps soon.", zh: '我们将很快与您联系，告知后续步骤。' },

  // Resources page
  resources_title: { en: 'Resources', zh: '资源中心' },
  resources_sub: { en: 'Everything you need to be an amazing dog parent — guides, articles, and tips from our team.', zh: '成为出色狗狗主人所需的一切——来自我们团队的指南、文章和技巧。' },
  resources_read_more: { en: 'Read More →', zh: '阅读更多 →' },
  resources_empty: { en: 'No resources posted yet. Check back soon!', zh: '暂无资源。请稍后再来查看！' },

  // About page
  about_title: { en: 'About Paws & Hearts Rescue', zh: '关于爱心救援' },
  about_sub: { en: "We're a volunteer-run nonprofit dedicated to giving every dog a second chance at a happy life.", zh: '我们是一个由志愿者运营的非营利组织，致力于为每只狗狗提供第二次获得幸福生活的机会。' },
  about_mission_title: { en: 'Our Mission', zh: '我们的使命' },
  about_mission1: { en: 'Founded in 2014, Paws & Hearts Rescue has saved over 500 dogs from shelters and difficult situations. We believe every dog deserves a loving, permanent home — not just survival.', zh: '成立于2014年，爱心救援已从收容所和困难处境中救助了500多只狗狗。我们相信每只狗都值得拥有一个充满爱的永久家庭——而不仅仅是生存。' },
  about_mission2: { en: 'We focus on comprehensive rehabilitation: medical care, behavioral training, and socialization before placement. We match dogs carefully with families to ensure lasting bonds.', zh: '我们专注于全面康复：医疗护理、行为训练和社会化训练。我们仔细地将狗狗与家庭进行匹配，以确保持久的感情纽带。' },
  about_mission3: { en: 'We are 100% volunteer-run and funded by donations and adoption fees. Every dollar goes directly to the dogs.', zh: '我们100%由志愿者运营，并通过捐款和领养费用资助。每一分钱都直接用于狗狗。' },
  about_team_title: { en: 'Our Team', zh: '我们的团队' },
  about_contact_title: { en: 'Get in Touch', zh: '联系我们' },
  about_contact_sub: { en: 'Questions about adoption, fostering, or anything else? We\'d love to hear from you.', zh: '有关领养、寄养或其他问题？我们很乐意听取您的意见。' },
  contact_subject: { en: 'Subject', zh: '主题' },
  contact_message: { en: 'Message', zh: '留言' },
  contact_send: { en: 'Send Message', zh: '发送消息' },
  contact_success_title: { en: 'Message Sent!', zh: '消息已发送！' },
  contact_success_msg: { en: "We'll get back to you within 1-2 business days.", zh: '我们将在1-2个工作日内回复您。' },
};

export type TranslationKey = keyof typeof t;
