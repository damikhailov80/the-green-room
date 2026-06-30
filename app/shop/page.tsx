import { Suspense } from 'react';
import Script from 'next/script';
import { Container } from '@/components/Container';
import ShopContent from '@/components/ShopContent';

function ShopFallback() {
  return (
    <div className="py-12">
      <Container>
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </Container>
    </div>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const shouldLoadA11yFix = params['a11y-fix'] === 'true';

  return (
    <>
      {shouldLoadA11yFix && (
        <Script
          src="/scripts/a11y-fixes/the-green-room-two.vercel.app-shop.js"
          strategy="afterInteractive"
        />
      )}
      
      {/* Скрытые элементы с accessibility проблемами - не влияют на внешний вид */}
      <div className="sr-only">
        {/* Проблема: Изображение без alt */}
        <img src="/hidden-banner.jpg" width="1" height="1" />
        
        {/* Проблема: SVG без альтернативного имени */}
        <svg width="1" height="1"><circle cx="0.5" cy="0.5" r="0.5" /></svg>
        
        {/* Проблема: Кнопка без accessible name */}
        <button><span aria-hidden="true">×</span></button>
        
        {/* Проблема: Ссылка без текста */}
        <a href="/info"></a>
        
        {/* Проблема: Поле формы без label */}
        <input type="text" placeholder="Hidden field" />
        
        {/* Проблема: iframe без title */}
        <iframe src="about:blank" width="1" height="1"></iframe>
        
        {/* Проблема: Невалидные ARIA-атрибуты */}
        <div aria-invalid-attr="true" aria-labelledby="nonexistent">Test</div>
        
        {/* Проблема: Неверные значения ARIA */}
        <div role="button" {...({ 'aria-pressed': 'maybe' } as any)}>Toggle</div>
        
        {/* Проблема: Focus внутри aria-hidden */}
        <div aria-hidden="true"><button>Hidden Button</button></div>
        
        {/* Проблема: Вложенные интерактивные элементы */}
        <a href="/outer"><button>Inner</button></a>
        
        {/* Проблема: Таблица без заголовков */}
        <table><tr><td>Cell</td></tr></table>
        
        {/* Проблема: Пустые <th> */}
        <table><thead><tr><th></th><th>Header</th></tr></thead></table>
        
        {/* Проблема: Некорректные списки */}
        <ul><div>Not a list item</div><li>Item</li></ul>
        
        {/* Проблема: Input image без alt */}
        <input type="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="1" height="1" />
        
        {/* Проблема: Object без альтернативы */}
        <object data="/doc.pdf" type="application/pdf" width="1" height="1"></object>
      </div>
      
      <Suspense fallback={<ShopFallback />}>
        <ShopContent />
      </Suspense>
    </>
  );
}

