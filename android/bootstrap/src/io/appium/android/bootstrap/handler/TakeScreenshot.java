package io.appium.android.bootstrap.handler;

import io.appium.android.bootstrap.AndroidCommand;
import io.appium.android.bootstrap.AndroidCommandResult;
import io.appium.android.bootstrap.CommandHandler;

import java.io.File;

import com.android.uiautomator.core.UiDevice;

/**
 * This handler is used to TakeScreenshot.
 * 
 */
public class TakeScreenshot extends CommandHandler {

  /*
   * @param command The {@link AndroidCommand} used for this handler.
   * 
   * @return {@link AndroidCommandResult}
   * 
   * @throws JSONException
   * 
   * @see io.appium.android.bootstrap.CommandHandler#execute(io.appium.android.
   * bootstrap.AndroidCommand)
   */
  @Override
  public AndroidCommandResult execute(final AndroidCommand command) {
    final boolean result = UiDevice.getInstance().takeScreenshot(
        new File("/data/local/tmp/screenshot.png"));
    return getSuccessResult(result);
  }
}