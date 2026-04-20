'use client';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';

export default function AntdProvider({ children }) {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    const style = extractStyle(cache);
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: style }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}