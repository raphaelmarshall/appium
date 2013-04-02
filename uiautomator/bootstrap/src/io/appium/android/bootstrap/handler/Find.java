/**
 * 
 */
package io.appium.android.bootstrap.handler;
import java.util.Hashtable;

import io.appium.android.bootstrap.AndroidCommand;
import io.appium.android.bootstrap.AndroidCommandResult;
import io.appium.android.bootstrap.AndroidCommandSelector;
import io.appium.android.bootstrap.CommandHandler;
import io.appium.android.bootstrap.WDStatus;
import io.appium.android.bootstrap.exceptions.AndroidCommandException;
import io.appium.android.bootstrap.exceptions.ElementNotFoundException;
import io.appium.android.bootstrap.exceptions.InvalidStrategyException;

import org.json.JSONArray;
import org.json.JSONException;

import com.android.uiautomator.core.UiObjectNotFoundException;

/**
 * @author xuru
 *
 */
public class Find extends CommandHandler {
	
	public AndroidCommandResult execute(AndroidCommand command) throws JSONException {
		Hashtable<String, Object> params = command.params();
		
		if (!command.isElementCommand()) {
			// only makes sense on a device
            String strategy = (String) params.get("strategy");
            String selector = (String) params.get("selector");
            Boolean multiple = (Boolean) params.get("multiple");
            String contextId = (String) params.get("context");
            JSONArray xpathPath = new JSONArray();
            String xpathAttr = "";
            String xpathConstraint = "";
            boolean xpathSubstr = false;
            boolean isXpath = strategy.equals("xpath");
            if (isXpath) {
                xpathPath = (JSONArray) params.get("path");
                xpathAttr = (String) params.get("attr");
                xpathConstraint = (String) params.get("constraint");
                xpathSubstr = (Boolean) params.get("substr");
            }
            try {
                if (multiple) {
                    if (isXpath) {
                        return getSuccessResult(AndroidCommandSelector.findElementsByXpath(xpathPath, xpathAttr, xpathConstraint, xpathSubstr, contextId));
                    } else {
                        return getSuccessResult(AndroidCommandSelector.findElements(strategy, selector, contextId));
                    }
                } else {
                    try {
                        if (isXpath) {
                            return getSuccessResult(AndroidCommandSelector.findElementByXpath(xpathPath, xpathAttr, xpathConstraint, xpathSubstr, contextId));
                        } else {
                            return getSuccessResult(AndroidCommandSelector.findElement(strategy, selector, contextId));
                        }
                    } catch (ElementNotFoundException e) {
                        return new AndroidCommandResult(WDStatus.NO_SUCH_ELEMENT, e.getMessage());
                    }
                }
            } catch (UiObjectNotFoundException e) {
                return new AndroidCommandResult(WDStatus.STALE_ELEMENT_REFERENCE, e.getMessage());
            } catch (AndroidCommandException e) {
				getErrorResult(e.getMessage());
			} catch (InvalidStrategyException e) {
				getErrorResult(e.getMessage());
			}
		} else {
            return getErrorResult("Unable to get attribute without an element.");
		}
		return getErrorResult("Unknown error finding element");
	}
}
