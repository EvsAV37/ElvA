// ============================================================================
// ElvA — настройки. Всё, что меняется при переезде на другой сервер или
// при запуске в другом городе, — здесь. Файл лежит рядом с index.html и
// admin.html, его читают оба.
//
// Менять только значения в кавычках. Кавычки и запятые в конце строк не трогать.
//
// Что при смене города или названия поменять ЕЩЁ (этот файл туда не достаёт):
//   manifest.webmanifest — "name", "short_name", "description" (подпись под значком);
//   index.html, строка <meta name="apple-mobile-web-app-title"> (подпись под значком на iPhone);
//   часовой пояс — в базе: private.config, ключ timezone (см. 24_elva_config_timezone.sql);
//   логотип «ElvA» на заставке нарисован под это слово — при смене названия его перерисовать.
// ============================================================================

window.ELVA_CONFIG = {

  // ---------- Сервер ----------
  // Из Supabase: Settings → API. Ключ публичный — данные защищает сама база.
  supabaseUrl: 'https://uoqaaemktxcumcsdmhpj.supabase.co',
  supabaseAnonKey: 'sb_publishable_58ozWUWGOSBIC6A0CUMQjw_ZBkPKXss',

  // Открытый ключ уведомлений. Пара к закрытому ключу в Supabase Secrets
  // (VAPID_PRIVATE_KEY). Меняются только вместе.
  vapidPublicKey: 'BP5msxgPxSDNLtuCD5Ui07eBhoJOnuLQGvml2XeeBOrMHZd1moRdLDn3xcb5-QrE7qQZo_DzPo5z_Z9BMCU-lgI',

  // ---------- Название и город ----------
  appName: 'ElvA',                       // в текстах, «Помощи», письме в поддержку, панели
  tagline: 'Такси по Олёкминску',        // под логотипом и в названии вкладки браузера
  cityGenitive: 'Олёкминска',            // «по времени Олёкминска» в «Цифрах» панели
  plateRegion: '14',                     // регион в подсказке госномера: «А123ВС 14»

  // ---------- Поддержка и подпись ----------
  supportEmail: 'elva.service.support@gmail.com',
  appVersion: '0.9',
  copyright: '© 2026 Евсеев А.В.'
};
