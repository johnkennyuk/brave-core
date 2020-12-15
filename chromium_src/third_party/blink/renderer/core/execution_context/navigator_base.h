/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_CHROMIUM_SRC_THIRD_PARTY_BLINK_RENDERER_CORE_EXECUTION_CONTEXT_NAVIGATOR_BASE_H_
#define BRAVE_CHROMIUM_SRC_THIRD_PARTY_BLINK_RENDERER_CORE_EXECUTION_CONTEXT_NAVIGATOR_BASE_H_

#include "third_party/blink/public/platform/web_content_settings_client.h"
#include "third_party/blink/renderer/core/execution_context/execution_context.h"
#include "third_party/blink/renderer/core/frame/local_frame.h"
#include "third_party/blink/renderer/core/frame/navigator_ua.h"
#include "third_party/blink/renderer/core/loader/frame_loader.h"

#define userAgent                                                             \
  userAgent() const override {                                                \
    if (blink::WebContentSettingsClient* settings =                           \
            brave::GetContentSettingsClientFor(GetExecutionContext())) {      \
      if (!settings->AllowFingerprinting(true)) {                             \
        return brave::BraveSessionCache::From(*(GetExecutionContext()))       \
            .FarbledUserAgent(DomWindow()->GetFrame()->Loader().UserAgent()); \
      }                                                                       \
    }                                                                         \
    return userAgent_ChromiumImpl();                                          \
  }                                                                           \
  String userAgent_ChromiumImpl

#include "../../../../../../../third_party/blink/renderer/core/execution_context/navigator_base.h"
#undef userAgent



#endif  // BRAVE_CHROMIUM_SRC_THIRD_PARTY_BLINK_RENDERER_CORE_EXECUTION_CONTEXT_NAVIGATOR_BASE_H_
